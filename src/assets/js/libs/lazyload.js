document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"))
    let active = false
    let browser = navigator.userAgent
  
    const lazyLoad = function() {
      if (active === false) {
        active = true

        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
              if (browser.lastIndexOf('Chrome/') > 0) {
                lazyImage.src = lazyImage.dataset.srcwebp
                lazyImage.srcset = lazyImage.dataset.srcwebp
              }
              else{
                lazyImage.src = lazyImage.dataset.src
                lazyImage.srcset = lazyImage.dataset.srcset
              }
              lazyImage.classList.remove("lazy")
              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage
              })
  
              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad)
                window.removeEventListener("resize", lazyLoad)
                window.removeEventListener("orientationchange", lazyLoad)
              }
            }
          });
  
          active = false
        }, 200);
      }
    };
  
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  });