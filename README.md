# ImageDithering

## Overview

A React project allowing user to upload image and apply various image dithering methods to the image. User will be allowed to download the image after applying the dithering method they chose. 

## Setup & Run:

Clone the repository to a local folder

CD into the folder path in terminal

Then use command -npm start to start the web application at deafult 3000 protal.

Open http://localhost:3000/ in browser to use the web application

## Feature:

-Dynmaically resizing the image uploaded by user into fixed canvas size so it fits to the screen(512 x 512)

-Provides threshold, pattern, ordered, random and error diffusion dithering function for users to choose from.

-Having preview for users to see what the image looks like after applying the dithering function (Current Image)

-Undo and Redo (Undo: switch the current image with preivous image or Redo: after undo, switch back to the image before undo)

-User should be able to download the image as showing in the current image canvas

-Provided an image found on wikipedia page for dithering as a default image for user to test with
