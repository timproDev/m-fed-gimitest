# Article Component

> The article component is different from other component in that is generally the primary element of the page. It can also contain components, such as content panels or videos.

Launch [demo](https://timprodev.github.io/m-fed-article/ "Article Demo Page")

### UX Enhancements

This article is an improvement from the earlier version for the following reasons (some of which are not yet live):

* Increased font size for improved legibility
* Centered content
* Limiting the competition for attention by minimized secondary components/content
* Semantic HTML5 mark up
* ...more

### Components used on article template

Components are to be either hard backed into the appropriate article usage or authored. TBD.

> Components will be themed, thus layout and presentation of each component is determined by use-case, active brand and unique design determinations.

Article content:
* Title
* Meta data: author, content label, date published
* sub-title
* introduction
* Accordion
* Inline (in-body) Video
* In-line image
* feature image (full width)
...

Related content:
* document download
* infographic
* campaign callout
* video player
* partner article(s)
* partner service(s)

Call to actions:
* subscription/form
* contact
* share

## Considerations and governance

* HTML treatment of dynamic content vs author composed
* Possible to remove hard coded utility CSS in template; i.e. instead, use sass @extend
* No more posting of videos in the right rail - in body only
* p tags and body copy elements currently have margin-top - not margin-bottom;

### HTML
```html

<div class="large-12 medium-6 columns">
<!-- code here -->
</div>

```
### CSS
```css

.primary-content {
	@extend .large-12, .medium-6, .columns	
}

```

## Article Structure

* Article Shell
* Article Body

### HTML for Article Shell
```html

<article class="rf-article">
    <div class="rf-article-inner">
        <!-- article title -->
        <div class="rf-article__header">            
            <div class="rf-article__header-inner">
                <h1 class="rf-article__header__title"><!-- content --></h1>
                <div class="rf-meta">
                    <!-- content -->
                </div>
            </div>                                
        </div>
        <div class="rf-article__body"> 
           <!-- article body -->
        </div>
        <div class="rf-article__footer">
            <div class="rf-article__footer-inner">
                <!-- content blocks/related components -->
            </div>
        </div>
    </div>
</article>

```
### HTML for Article Body
```html

<figure class="rf-full-image"><img src=""></figure>

<section class="rf-article__body__primary">
	<!-- content body tags p, h1, h2, h3, h4, h5 -->
</section>

<section class="rf-article__body__primary">                
	<!-- content body tags p, h1, h2, h3, h4, h5 -->
</section>


```
### SASS STRUCTURE
```css

/* no code */

```

### Javascript
```javascript

// no code
    
```
## Authors

* **Tim Schletter** - *Front End Developer*

## Local Configuration Notes

Local Build
* Local Apache; Foundation CSS Framework; js and jQuery; HTML5; PHP; SASS and Compass

Export php project into fedExport folder

Git push fold contents to github