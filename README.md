docpad-gulp
===========

A try at making a Docpad clone with Gulp

First clone the repo

    git clone https://github.com/believer/docpad-gulp.git

Step in to the folder

    cd docpad-gulp

Install dependencies
    
    npm install -g bower gulp
    npm install
    
Run gulp

    gulp
    
## Partials

### Image list

    type: image-list
    content:
        -
            image:
                src: path/to/img.jpg
                alt: Alt text
            texts:
                - Text to the left of the image
                - Text to the right of the image
                
### Image

**Mandatory**
* type
* image or background (if start is true)

**Optional**
* background: HEX / RGB (HEX needs to have quotation marks i.e. "#bada55")
* title: Title text
* start: boolean (Tells template that image is first on page and allows title etc.)
* hasDown: boolean (Shows arrow pointing down)
* height: pixels
* downBg: HEX / RGB (background color for down arrow)

Example
    
    type: image
    image:
        src: /images/case.jpg
        alt: Case image
    start: true
    title: Case title
    hasDown: true
