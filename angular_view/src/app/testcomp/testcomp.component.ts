import { Component, OnInit } from '@angular/core';
import {IImage, ImageCompressService} from "ng2-image-compress";
import {ImageResult, ResizeOptions} from "ng2-imageupload";

@Component({
  selector: 'app-testcomp',
  templateUrl: './testcomp.component.html',
  styleUrls: ['./testcomp.component.css']
})
export class TestcompComponent implements OnInit {

  title = 'app';
  selectedImage: any;
  processedImages: any = [];
  showTitle: boolean = false;
  //
  constructor(private imgCompressService: ImageCompressService) { }

  // src: string = "";
  // resizeOptions: ResizeOptions = {
  //   resizeMaxHeight: 800,
  //   resizeMaxWidth: 1024,
  //   resizeQuality:0.7
  // };
  //
  // selected(imageResult: ImageResult) {
  //   this.src = imageResult.resized
  //     && imageResult.resized.dataURL
  //     || imageResult.dataURL;
  //
  //   console.log(imageResult.resized.dataURL)
  // }

  // constructor() { }
  //
  // }
  //
  onChange(fileInput: any) {
    let fileList: FileList;

    let images: Array<IImage> = [];

    ImageCompressService.filesToCompressedImageSource(fileInput.target.files).then(observableImages => {
      observableImages.subscribe((image) => {
        images.push(image);
        console.log(fileInput.target.files)
        console.log(images)
        console.log(images[0]['imageDataUrl'])
      }, (error) => {
        console.log("Error while converting"); }
      // }, () => {
      //   this.processedImages = images;
      //   console.log(this.processedImages)
      //   this.showTitle = true;
      // }
      );
    });

    //
  }

  ngOnInit(): void {
  }
}
