import Box from '@mui/material/Box'

import Bar from './Bar'
import Events from './Events'
import LeftMenu from './LeftMenu'
import HomeMap from './HomeMap'
import Grid from '@mui/material/Grid'

const Home = () => {

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Bar />
        <LeftMenu />
        <Grid container spacing={2} sx={{ bgcolor: '#fafafa' }}>
          <Grid item xs={4}>
            <Events />
          </Grid>
          <Grid item xs={8}>
            <HomeMap />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Home