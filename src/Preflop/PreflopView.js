import React from 'react'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FileBrowser from 'FileBrowser/FileBrowser'
import Range from 'Range'

const PreflopView = props => {

  const {
    fileBrowserPath,
    fileBrowserPathIsDir,
    savedRanges,
    onRangeLoad,
    onRangeSave,
    onRangeChange,
    onRangeCopyFrom,
    onModalShow,
  } = props

  React.useEffect(() => {
    if (!fileBrowserPathIsDir) {
      onRangeLoad({path: fileBrowserPath})
    }
  }, [
    onRangeLoad,
    fileBrowserPath,
    fileBrowserPathIsDir
  ])

  const heroRangePath = fileBrowserPath
  const heroRange = savedRanges[fileBrowserPath]?.range
  const villainRangePath = savedRanges[fileBrowserPath]?.villainRangePath
  const villainRange = savedRanges[villainRangePath]?.range

  return (
    <Container fluid style={{padding: 0, paddingTop: '10px'}}>
      <SmallPaddingCol sm="auto" style={{float: 'left'}}>
          <FileBrowser id="Preflop" />
      </SmallPaddingCol>
      <Row style={{margin: 0}}>
        {heroRange &&
          <SmallPaddingCol sm="auto">
            <Range
              initial={heroRange}
              name={`Hero Range (${heroRangePath})`}
              path={heroRangePath}
              villainRangePath={villainRangePath}
              onRangeSave={onRangeSave}
              onRangeChange={onRangeChange}
              onRangeCopyFrom={onRangeCopyFrom}
              onModalShow={onModalShow}
            />
          </SmallPaddingCol>
        }

        {villainRange &&
          <SmallPaddingCol sm="auto">
            <Range
              initial={villainRange}
              name={`Villain Range (${villainRangePath})`}
              path={villainRangePath}
              onRangeSave={onRangeSave}
              onRangeChange={onRangeChange}
              onRangeCopyFrom={onRangeCopyFrom}
              onModalShow={onModalShow}
            />
          </SmallPaddingCol>
        }
      </Row>
    </Container>
  )
}

const SmallPaddingCol = styled(Col)`
  padding: 2px;
`

export default PreflopView
