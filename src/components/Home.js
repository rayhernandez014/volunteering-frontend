import Box from '@mui/material/Box'

import Bar from './Bar'
import Events from './Events'
import LeftMenu from './LeftMenu'


const Home = () => {

  return (
    <Box sx={{ display: 'flex' }}>
      <Bar />
      <LeftMenu />
      <Events />
    </Box>
  )
}

export default Home