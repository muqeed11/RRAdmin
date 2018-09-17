var express = require('express');
var router = express.Router();
var Reports = require('../models/reports');
var mkdirp = require('mkdirp');
var Userprofile = require('../models/userprofile');
var fs = require('fs');
var fse = require('fs-extra');
var PDFDocument = require('pdfkit');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var middlewareObj = require('./middleware');
var moment = require('moment');



router.use('/',function (req,res,next) {

    jwt.verify(req.query.token,'secret',function (err,decoded) {

        if(err)
        {
            // return res.status(401).json({
            return res.json({
                response:'Not Authenticated',
                responseStatus:'99'
            })
        }
        else {
            req.decoded = decoded

            var tempuserid = "";
            if(req.query.userId != null)
                tempuserid = req.query.userId
            else
                tempuserid = req.body.userId

            if(req.decoded.user.userId === tempuserid)
                next();
            else
            {
                res.json({
                    response: 'Please login again..!',
                    responseStatus:'99'
                });
            }
        }
    })

});



//define multer storage
var store = multer.diskStorage({
    destination:function (req,file,cb) {
        const permanentFolder = 'public/Reports_folder/Reports/' + req.body.customerId + '/';
       mkdirp(permanentFolder)
        cb(null,permanentFolder)
    },
    filename:function (req,file,cb) {
        cb(null,req.body.reportFileNames);
    }
});
var upload = multer({storage:store}).single('file');


router.post('/upload', function (req, res, next){

         const a = "public/Reports_folder/TempReports/";
         const ReportFilename =  a.concat(req.body.reportFilename);
        const base64data = new Buffer(req.body.reportContent, 'base64');

        // if(!err) {
            // console.log(ReportFilename)
            fs.writeFile(ReportFilename,base64data, function (err) {
                if(!err) {
                    res.send({
                        response: "report saved",
                        responseStatus: '0'
                    });
                }
                else {
                    res.send({
                        response: "Error while saving the report",
                        responseStatus: '1'
                    });

                }
            });
        // }

    // });
});

router.post('/addreport',function (req,res,next) {

    console.log(req.body.reportDate)
    const tempFolder = "public/Reports_folder/TempReports/";
    const permanentFolder = 'public/Reports_folder/Reports/' + req.body.userId + '/';
    const reportFilenamesArray = req.body.reportFileNames.split(",");
    console.log(reportFilenamesArray)
    if(moment(req.body.reportDate,'DD/MM/YYYY').isValid())
    {
    var date = moment(req.body.reportDate, 'DD/MM/YYYY');
    var train_date = date.format('YYYY-MM-DD');
    console.log(train_date);
        mkdirp(permanentFolder, function (err) {
            if (!err) {
                for (var i = 0; i < reportFilenamesArray.length; i++) {
                    let reportFullPath = permanentFolder + reportFilenamesArray[i];
                    const reports = new Reports({
                        userId: req.body.userId,
                        reportType: req.body.reportType,
                        reportDate: train_date,
                        reportKey: reportFullPath,
                        reportStatus: "Approved",
                        reportReason: "Auto Approved",
                        uploadedBy: req.body.uploadedBy,
                        createdDate: Date.now(),
                        lastUpdated: Date.now()

                    });
                    reports.save(function (err1, result) {
                        if (err1) {
                            console.log('inside error', i, err1)
                            i = reportFilenamesArray.length
                            return res.json({
                                title: 'An Error Occured while saving data in reports table',
                                error: err1,
                                responseStatus: '1'
                            });
                        }
                    });

                    fse.move(tempFolder + reportFilenamesArray[i], reportFullPath, function (err) {
                        if (err) {
                            return res.json({
                                title: 'An Error Occured while moving reports',
                                error: err,
                                responseStatus: '1'
                            })
                        }
                        else {
                            console.log("files moved");
                            return res.json({
                                response: "reports uploaded",
                                responseStatus: '0'
                            });
                        }
                    })
                }
            }
            else {
                return res.json({
                    response: "Error while creating permanent folder",
                    responseStatus: '1'
                });
            }
        });
    }
    else
    {
        console.log('inside else')
        return res.json({
            response: 'Do not run with invalid date..!',
            responseStatus: '1'
        });
    }

});

router.post('/searchreports',function (req,res,next) {


    if(req.body.fromDate && req.body.toDate && req.body.reportType) {

        var date1 = moment(req.body.fromDate, 'DD/MM/YYYY');
        var fromDate = date1.format('YYYY-MM-DD');

        var date2 = moment(req.body.toDate, 'DD/MM/YYYY');
        var toDate = date2.format('YYYY-MM-DD');

        Reports.find({userId: req.body.userId , reportType:req.body.reportType,
        reportDate:{$gte:fromDate ,$lte:toDate } , reportStatus:'Approved'}
        ,function (err,result) {

            if(!err) f1(result)
            else f2(err)

        })
    }

    else if(req.body.fromDate && req.body.toDate  ) {
        //get data if date range is selected

        var date1 = moment(req.body.fromDate, 'DD/MM/YYYY');
        var fromDate = date1.format('YYYY-MM-DD');

        var date2 = moment(req.body.toDate, 'DD/MM/YYYY');
        var toDate = date2.format('YYYY-MM-DD');

        Reports.find({userId: req.body.userId ,
            reportDate:{$gte:fromDate ,$lte:toDate } , reportStatus:'Approved'}, function (err,result) {

            if(!err) f1(result)
            else f2(err)
        })
    }

   else if(req.body.reportType) {
        Reports.find({userId: req.body.userId , reportType:req.body.reportType , reportStatus:'Approved'} , function (err,result) {

            if(!err) f1(result)
            else f2(err)
        });
    }

    function f1(result) {
        var date3
        var resultDate = '' ;
        var rsDate = '';
        var convertedDate = '';
        for(var i=0;i<result.length;i++) {
            resultDate = result[i].reportDate.toISOString()
            rsDate = resultDate.slice(0,10)
            date3 = moment(rsDate, 'YYYY-MM-DD');
            convertedDate = date3.format('DD/MM/YYYY');
            var data = result[i].toJSON()
            data['reportDate'] = convertedDate
            result[i] = data
        }

        return res.status(200).json({
            responseStatus: '0',
            userId: req.body.userId,
            totalrowcount: result.length,
            reports: result
        });
    }

    function f2(err) {
        return res.json({
            response: 'an Error occurred while fetching data from reports table',
            reponseStatus:'1'
        });
    }
});

router.post('/showreport',function(req,res,next){

    console.log(req.body._id)
    Reports.findOne({_id:req.body._id},function (err,result) {

        if(result) {
            const reportPath = result.reportKey;
            const reportType1 = result.reportType;
            fs.readFile(reportPath,'base64',function (err,base64string) {
                if(!err)
                {
                    return res.json({
                        reportFile:base64string,
                        responseStatus: '0',
                        reportType : reportType1
                    })
                }
                else {
                    return res.json({
                        responseStatus: '1',
                        response: 'An Error Occurred while fetching one report'
                    })
                }
            });
        }
        else
        {
            return res.json({
                response: "Error while fetching report..!",
                responseStatus: '1'
            })

        }


    })
});

router.post('/generatePDF',function (req,res,next) {

    let customerDetails ="";

    if(typeof (req.body.reportIdArray) == 'string')
        var reportIdObj = JSON.parse(req.body.reportIdArray);
    else
        reportIdObj = req.body.reportIdArray;

    // console.log(typeof reportIdObj)

        Reports.find({_id: {$in:reportIdObj}}, function (err,result) {

        // console.log(typeof(req.body.reportIdArray))
        if(!err)
        {
            //fetch customer details

            Userprofile.findOne({userId: req.body.userId } , function (err,result1) {

                if (!err) {

                    customerDetails = result1

                    generatePDF();
                }
                else {
                    return res.json({
                        response: "Error while fetching details from profile",
                        responseStatus: '1'
                    })
                }
        });
        }

                else {
                    return res.json({
                        response: "file not generated",
                        responseStatus: '1'
                    })
                }

        function generatePDF() {
            // console.log("customerDetails.customerName" + customerDetails.customerName)
            const doc = new PDFDocument;
            const PDFFormat = 'public/Reports_folder/PDFFormat/PDFFormat.jpg';
            const PDFFilename = 'public/Reports_folder/PDFReports/' + req.body.userId + 'ReportRacks.' + Date.now() + '.pdf';
            doc.pipe(fs.createWriteStream(PDFFilename));
            // doc.fontSize(15).text('Report Racks !',100 , 70);
            // doc.text('Selected Reports', {
            //     width: 410,
            //     align: 'left'
            // });

            doc.image('public/Reports_folder/PDFFormat/PDFFormat.jpg',20, 10, {scale: .70})
                .text(customerDetails.customerName,170,232)
                .text(customerDetails.dateOfBirth,170,265)
                .text(customerDetails.gender,170,295)
                .text(customerDetails.customerEmail,170,325)
                .text(customerDetails.city,170,355)
                .text(customerDetails.userId,450,232)
                .text(customerDetails.phoneNumber,450,265);

            // console.log(customerDetails.customerName)
            // doc.addContent(PDFFilename)
            //fetch report from table

            let xaxis=50;
            let yaxis = 120;
            for(let i=0;i<result.length;i++)
            {
                // console.log("customerDetails.customerName" + customerDetails.customerName)

                doc.addPage();
                doc.font('fonts/Antonio-Bold.ttf')
                    .text('Report Name: ' + result[i].reportType, {
                    width: 410,
                    align: 'left'
                });
                doc.font('fonts/Antonio-Bold.ttf')
                    .text('Customer Name: ' + customerDetails.customerName, {
                    width: 410,
                    align: 'left'
                });

                // doc.image(result[i].reportKey,xaxis, yaxis,{width:300,height:300})
                doc.image(result[i].reportKey,xaxis, yaxis,{width:500})
                yaxis = yaxis + 20

            }
            doc.end();
            return res.json({
                responseStatus: '0',
                PDFURL: PDFFilename
            })
        }
    });
});

router.post('/uploadLabReport',function(req,res,next) {

    const permanentFolder = 'public/Reports_folder/Reports/' + req.body.customerId + '/';
    let reportFullPath = "";
    let base64String=""

    mkdirp(permanentFolder, function (err) {
        if (!err) {

            for (var i = 0; i < req.body.numberofReports; i++) {

                base64String = req.body.reportsContents[i]['imageDataUrl']
                const base64data = new Buffer(base64String, 'base64');
                console.log(req.body.reportsContents[i]['imageDataUrl'])
                reportFullPath = permanentFolder + req.body.customerId + "." + req.body.reportType + "." + Date.now() + ".jpg";
                console.log(reportFullPath)

                fs.writeFile(reportFullPath, base64data, function (err) {
                    if (err) {
                        res.send({
                            response: "Error while saving the report",
                            responseStatus: '1'
                        });

                    }
                    else
                    {
                        saveReport()
                    }
                });

            }

            return res.json({
                response: "report saved",
                responseStatus: '0'
            });
        }
        else {
            return res.json({
                response: "Error while creating permanent folder",
                responseStatus: '1' });
        }
    });

    function saveReport() {
            const reports = new Reports({
                userId: req.body.customerId,
                reportType: req.body.reportType,
                reportDate: req.body.reportDate,
                reportKey: reportFullPath,
                reportStatus: "Approved",
                reportReason: "Auto Approved",
                uploadedBy: req.body.uploadedBy,
                createdDate: Date.now(),
                lastUpdated: Date.now()

            });
            reports.save(function (err1, result) {
                if (err1) {
                    return res.status(500).json({
                        title: 'An Error Occured while saving data in reports table',
                        error: err1,
                        responseStatus: '1'
                    });
                }
                // else {
                //     return res.json({
                //         response: 'reports table updated',
                //         responseStatus: '0'
                //     });
                // }
            });
    }

});


router.post('/fileupload',function (req,res,next) {

            upload(req,res,function (err) {
                if(err) {
                    console.log('report not uploaded..!' , err)

                    return res.json({
                        error:err
                    })
                }
                else {
                    console.log('report uploaded..!')
                    return res.json({
                        response:"uploaded",
                        responseStatus: '0'

                    })
                }
            });



});
module.exports = router;

