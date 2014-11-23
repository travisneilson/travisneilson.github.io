# AppStore Mock HTML/CSS Usage Notes



### Setting the review stars
The review stars are controlled by a modifying class on the `.stars` element.

The available classes are:

- .rating-5
- .rating-4
- .rating-3
- .rating-2
- .rating-1
- .rating-4-5
- .rating-3-5
- .rating-2-5
- .rating-1-5
- .rating-0-5

Both half and whole steps are accounted for.

Example:

`<div class="stars rating-3-5">`

This will display 3.5 stars.

*You also need to account for the number of reviews*

The number of reviews is a `span.rating-count` nested inside the `.stars` element.

e.g. `<div class="stars rating-3-5">(<span class="rating-count">17</span>)</div>`



### Carousel

The carousel is made possible by Scooch.js

The carousel is failry straight forward with the exception of the video. Add the `.vid` class to the `.m-item` element to stop the overlay carousel from sliding up.
The `.vid` element is unique also becuase it is an `a` (anchor) tag and not a `div` the `href` attribute contains a link to the playable video. Safari naturally knows what to do when you link to a video.



### Disabled links

There are a few `a` links that are disabled via a `.no-click` class. I used this to make sure people didn't randomly click off to a place we had made no accomodation for yet. To re-enable a link to be clickable; remove the `.no-click` class.
