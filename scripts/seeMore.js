var seeMore = function (selector, selectorImages, elementButton, row, hiddenButton) {
  var element = document.querySelector(selector),
    elementImages = document.querySelectorAll(selectorImages),
    buttonElement = document.querySelector(elementButton)


  window.addEventListener('load', parse)
  window.addEventListener('resize', parse)

  var seeMore = 'see-more'
  var elementImagesArray = Array.from(elementImages)

  var newElement = elementImagesArray.find(function (elem) {
    return elem.naturalHeight !== 0
  })

  var newHeight = newElement.offsetHeight
  var elementHeight = element.offsetHeight

  function parse() {
    var elementHeight = element.offsetHeight

    elementImages.forEach(function (elementImage) {
      elementImage.onerror = function () {
        alert('carrreguei')
      }
      var elementImageHeight = elementImage.naturalHeight !== 0 ? elementImage.offsetHeight : ''

      element.style.maxHeight = elementImageHeight * row + 'px'
      elementHeight == elementImageHeight ? buttonElement.style.display = 'none' : ''

      imageNotLoaded(elementImage, elementImageHeight)
    })
  }

  buttonElement.addEventListener('click', function () {
    document.body.classList.toggle(seeMore)
    element.style.maxHeight = elementHeight + 'px'

    hiddenButton ? this.style.display = 'none' : ''
  })

  function imageNotLoaded(elementImage, elementImageHeight) {
    if (elementImage.naturalHeight === 0 || elementImage.naturalWidth === 0) {
      elementImage.parentElement.replaceChild(creatElement(elementImageHeight), elementImage)
    }
  }

  function creatElement(elementImageHeight) {
    var title = document.createTextNode('OPSSS!'),
      description = document.createTextNode('Não foi possivel carregar esta imagem')

    var divElement = document.createElement('div'),
      titleElement = document.createElement('h1'),
      descriptionElement = document.createElement('article')

    titleElement.appendChild(title)
    descriptionElement.appendChild(description)
    divElement.appendChild(titleElement)
    divElement.appendChild(descriptionElement)
    divElement.style.height = newHeight + 'px'
    divElement.classList.add('isnt-loaded')

    return divElement
  }

  parse()
}

