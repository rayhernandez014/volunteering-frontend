import { useDispatch, useSelector } from 'react-redux'
import { setMobile } from '../reducers/mobileReducer'
import { useNavigate } from 'react-router-dom'

import { setOpen } from '../reducers/confirmationReducer'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

const drawerWidth = 240

const LeftMenu = () => {
  const mobileOpen = useSelector( (state) => state.mobile)
  const loggedUser = useSelector((state) => state.login)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    dispatch(setMobile(!mobileOpen))
  }

  const handleCreateButton = () => {
    if (loggedUser) {
      navigate('/eventform')
    }
    else{
      dispatch(setOpen(true))
    }

  }

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem>
          <Button variant="text" sx={{ borderRadius: 4 }}> OPENINGS </Button>
        </ListItem>
        <ListItem>
          <Button variant="text" sx={{ borderRadius: 4 }}> GOING </Button>
        </ListItem>
        <ListItem>
          <Button variant="text" sx={{ borderRadius: 4 }}> HISTORY </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" sx={{ borderRadius: 4 }} onClick={handleCreateButton}> + CREATE </Button>
        </ListItem>
      </List>
    </div>
  )

  const container = window !== undefined ? () => window.document.body : undefined

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default LeftMenu