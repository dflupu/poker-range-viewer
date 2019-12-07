import {connect} from 'react-redux'
import {setCardsAction, setSelectedCombo} from './Store/actions'
import CardsView from './CardsView'

const mapStateToProps = (state, props) => {
  return {
    name: props.name,
    isEditting: state.isEditting,
    ...state.range[props.name]
  }
}

const mapDispatchToProps = {setCardsAction, setSelectedCombo}

export default connect(mapStateToProps, mapDispatchToProps)(CardsView)
