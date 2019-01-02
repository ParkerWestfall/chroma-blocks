const initState = {
  count: wp.data.select('core/editor').getBlocks().filter(e=>e.name === 'chroma-blocks/slider-block').length,
}

//register
wp.data.registerStore('chroma', {
  reducer: reducer,
  selectors: { getSlideCount },
  actions: {countSlide: countSlide}
})
//reducer
function reducer( state = initState, action ) {
  switch (action.type) {
    case 'COUNT_SLIDE':
      state.count = state.count + 1
      break;
    default:
      break;
  }
  return state;
}
//actions
function countSlide() {
  return {
    type: 'COUNT_SLIDE',
  }
}
//selectors
function getSlideCount(state, clientId) {
  var slides = wp.data.select('core/editor').getBlocks().filter(e=>e.name === 'chroma-blocks/slider-block').reverse();
  var targetSlide = wp.data.select('core/editor').getBlock(clientId)
  if (targetSlide != null && typeof targetSlide != 'undefined')
    targetSlide.attributes.slideCount = slides.indexOf(targetSlide) + 1
  return slides.indexOf(targetSlide) + 1
}

///subscriber
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    wp.data.subscribe( function() {
    })
  }
}
