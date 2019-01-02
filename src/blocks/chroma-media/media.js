/**
 * BLOCK: chroma-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { registerBlockType } = wp.blocks;
const {
  Editable,
  MediaUpload,
  AlignmentToolbar,
  BlockControls,
  BlockAlignmentToolbar,
} = wp.editor;
const {
  Button, Toolbar, Tooltip
} = wp.components;

registerBlockType( 'chroma-blocks/media-upload', {
	title: 'Chroma Upload',
	icon: 'format-image',
	category: 'Chroma',
	attributes: {
    imgURL: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: 'img',
    },
    imgID: {
      type: 'number',
    },
    imgAlt: {
      type: 'string',
      source: 'attribute',
      attribute: 'alt',
      selector: 'img',
    },
    caption: {
      type: 'array',
      source: 'children',
      selector: '.figcaption_link'
    },
    captionLink: {
      type: 'string',
      source: 'attribute',
      attribute: 'href',
      selector: '.figcaption_link'
    },
    center: {
      type: 'boolean',
      default: false,
    },
    centerDark: {
      type: 'boolean',
      default: false,
    },
    contStyle: {
      type: 'string',
      source: 'attribute',
      attribute: 'class',
      selector: '.wp-block-chroma-blocks-media-upload',
    },
    alignment: {
      type: 'string',
      default: 'none'
    }
	},
	edit: props => {
    const { attributes: { imgID, imgURL, imgAlt, caption, captionLink, center, centerDark, alignment }, className, setAttributes, isSelected } = props;
    const onSelectImage = img => {
        var captionLink = null
        fetch(`/wp-json/wp/v2/media/${img.id}`)
        .then(function(response) {
          return response.json()
        })
        .then(function(myJson) {
          if (typeof myJson.meta != 'undefined') {
            captionLink = myJson.meta.chroma_caption_hyperlink
            return captionLink
          }
        })
        .then(function(captionLink) {
          setAttributes({
              imgID: img.id,
              imgURL: img.url,
              imgAlt: img.alt,
              caption: img.caption,
              captionLink: captionLink
          })
        })
    }
    const onRemoveImage = () => {
      setAttributes({
        imgID: null,
        imgURL: null,
        imgAlt: null,
      });
    }
    const onChangeAlignment = (newAlignment) => {
      props.setAttributes({
        alignment: newAlignment === undefined ? 'none' : newAlignment
      })
    }
    const getImgContainer = () => {
      let imgCont = 'image-container',
          imgDark = 'image-container--dark',
          classList = []
      if (center)
        classList.push(imgCont)
      else if(classList.indexOf(imgCont) != -1)
        classList.remove(imgCont)
      if (centerDark)
        classList.push(imgDark)
      else if (classList.indexOf(imgDark) != -1)
        classList.remove(imgDark)
      props.setAttributes({
        contStyle: classList.join(' ')
      })
      return classList.join(' ')
    }
		return (
      <div className={getImgContainer()}>
        <BlockControls>
          <AlignmentToolbar value={ alignment } onChange={ onChangeAlignment } />
          <Toolbar>
            <Tooltip text="Center">
              <Button className="components-button" style={center ? {background: '#4e4e4e', color: '#fff'}:null} onClick={ () => setAttributes( { center: ! center } ) }>
                Center
              </Button>
            </Tooltip>
            <Tooltip text="Center Dark">
              <Button className='components-button' style={centerDark ? {background: '#4e4e4e', color: '#fff'}:null} onClick={ () => setAttributes( { centerDark: ! centerDark } ) }>
                Center Dark
              </Button>
            </Tooltip>
          </Toolbar>
        </BlockControls>
      <figure className={caption ? 'entry-content_figure fig-wcaption' : 'entry-content_figure' }>
        <MediaUpload
          onSelect={ onSelectImage }
          allowedTypes="image"
          value={ imgID }
          render={ ( { open } ) => (
            <Button className={ imgID ? 'image-button' : 'button button-large' } onClick={ open }>
              { ! imgID ? 'Add Image' : <img src={ imgURL } alt={ imgAlt } /> }
            </Button>
          ) }
        />
        { caption ? (
          <figcaption className="figcaption">
            <a href={ captionLink } className="figcaption_link" target="_blank" rel="noopener">
              { caption }
            </a>
          </figcaption>
        ) : null
        }
      </figure>
      </div>
		);
	},
	save: props => {
    const { imgURL, imgAlt, caption, captionLink, center, centerDark, contStyle } = props.attributes;
    return (
      <div className={contStyle}>
        <figure class="entry-content_figure">
          <img
            src={ imgURL }
            alt={ imgAlt }
          />
          { caption ? (
            <figcaption className="figcaption">
              <a href={captionLink} className="figcaption_link" target="_blank" rel="noopener">
                {caption}
              </a>
            </figcaption>
          ) : null
          }
        </figure>
      </div>
  	)
  }
})
