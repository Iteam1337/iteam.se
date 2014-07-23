docpad-gulp
===========

A try at making a Docpad clone with Gulp

[![Build Status](http://drone.iteam.se/github.com/Iteam1337/docpad-gulp/status.svg?branch=master)](http://drone.iteam.se/github.com/Iteam1337/docpad-gulp)

First clone the repo

    git clone https://github.com/believer/docpad-gulp.git

Step in to the folder

    cd docpad-gulp

Install dependencies
    
    npm install -g bower gulp
    npm install
    
Run gulp

    gulp
    
# Partials

All `HEX` colors need to be surrounded by quotation marks i.e. "#bada55"
Gravatar images default to 80 pixels x 80 pixels if no size is supplied.

## Shared optionals
Most partials share similar optionals. They are referenced in each partial if it allows the variables.

* background: class name (color schemes are coming)
* background-color: `HEX` / `RGB`
* background-image: URL ( i.e. url(http://...) )
* color: `HEX` / `RGB`
* parallax: `Boolean` (if true background-image becomes static)

## Image list

**Mandatory**

* type
* content

**Example**

    type: image-list
    content:
        -
            image:
                src: path/to/img.jpg
                alt: Alt text
            texts:
                - Text to the left of the image
                - Text to the right of the image
                
## Image

**Mandatory**

* `type`
* `image` or `background` (if start is true)

**Optional**

* background: `HEX` `RGB` 
* title: `String`
* start: `Boolean` (Tells template that image is first on page and allows title etc.)
* hasDown: `Boolean` (Shows arrow pointing down)
* height: `Pixels`
* downBg: `HEX` / `RGB` (background color of down arrow)

**Example**
    
    type: image
    image:
        src: /images/case.jpg
        alt: Case image
    start: true
    title: Case title
    hasDown: true

## List

Splits items in to a two column layout

**Mandatory**

* type
* items

**Example**

    type: list
    items:
        - First item
        - Second item
        - Third item

## Map

**Mandatory**

* type

**Example**

    type: map

## Mosaic

**Mandatory**

* type: `String`
* images: `Array`

**Optional**

* background
* background-color

**Example**

    type: mosaic
    images:
        - URL to image
        - URL to second image

## Offers

**Mandatory**

* type

**Optional**

* background
* background-color

**Example**

    type: offers

## Quote

**Mandatory**

* type
* quote

**Optional**
* by (Name of quotee)
* background
* background-color

**Example**

    type: quote
    quote: I wish developing great products was as easy as writing a check.
    by: Steve Jobs

## Side image

**Mandatory**

* type
* text
* image

**Optional**

* background
* background-color
* color

**Example**

    type: side-image
    text: Lorem ipsum...
    image:
        src: path/to/img.jpg
        alt: alt-text

## Slider

**Mandatory**

* type
* content

**Example**

    type: slider
    content:
        -
            image: path/to/img.jpg
        -
            image: path/to/img.jpg
            text: Lorem ipsum...
        -
            text: Lorem ipsum...
        -
            image: path/to/img.jpg
            title: Iteam

## Stats

**Mandatory**

* type
* items
    * number
    * title

**Optional**
* background
* background-color
* color
* description
* title

**Example**

    type: stats
    title: Statistics
    description: Lorem ipsum...
    items:
        -
            number: 9001
            text: It's over

## Team

**Mandatory**

* `type`
* `team` (array of selected folder names in medarbetare)

**Optional**

* gravatar-sizes: `int`
* background
* background-color

**Example**

    type: team
    gravatar-sizes: 200
    team:
        - rickard
        - dennis


## Text

**Mandatory**

* type
* content or mdtext

**Optional**

* background
* background-color
* background-image
* color
* parallax
* one-line (Text is on one line strips some padding and centers text)

**Example**

    type: text
    mdtext: text (automatically looks in the same folder as the index file and adds .md)
    
or
    
    type: text
    content: Lorem ipsum...
    background-color: "#333"
    color: "#fff"
