import './style.scss'
import './editor.scss'

const {  RawHTML } = wp.element
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  BlockAlignmentToolbar,
  Editable,
  MediaUpload,
  InnerBlocks,
} = wp.editor
const { Button } = wp.components;
const {withSelect} = wp.data;
const TEMPLATE = [
  ['chroma-blocks/media-upload'],
]

registerBlockType( 'chroma-blocks/slider-block', {
	title: __( 'Slider Block' ),
	icon: 'images-alt',
	category: 'Chroma',
	attributes: {
    clientId: 1,
    sub_title: {
      type: 'array',
      source: 'children',
      selector: '.sb_h2'
    },
		content: {
			type: 'array',
			source: 'children',
			selector: '.sb_p',
		},
    slideCount: {
      source: 'attribute',
      selector: '.sb_bubble',
      attribute: 'data-slide-count',
      default: 1
    }
	},
	edit: withSelect( (select, props) => {
    return {
      slideCount: select('chroma').getSlideCount(props.clientId)
    }
  })( props => {
		const { attributes: { content, sub_title }, clientId, slideCount, focus, className, setFocus, setAttributes, isSelected } = props
    const onChangeSlideText = ( value ) => {
      setAttributes( { content: value } )
    }
    const ALLOWED_BLOCKS = ['chroma-blocks/media-upload', 'core/image', 'core/paragraph', 'core/list', 'core/table', 'core/button', 'core/classic-block']
    wp.data.dispatch('chroma').countSlide()
		return (
      <div className={'sb'} >
        <div data-slide-count={slideCount} className="sb_bubble"></div>
        <RichText
          tagName="h2"
          className="sb_h2"
          onChange={ (newTitle) => { props.setAttributes( { sub_title: newTitle } )} }
          value={ sub_title }
          focus={ focus }
          onFocus={ setFocus }
          placeholder={'Slide Title'}
        />
        <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE}/>
      </div>
		);
	}),
	save: props => {
    const { slideCount, sub_title, imgURL, imgAlt, content, caption, captionLink } = props.attributes;
    return (
      <div className='sb'>
        <div data-slide-count={slideCount} className="sb_bubble"></div>
        <RichText.Content tagName="h2" className="sb_h2" value={ sub_title } />
        <InnerBlocks.Content />
      </div>
  	)
  }
} );
