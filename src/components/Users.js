import { useSelector } from 'react-redux'
import { ListItem, ListItemText } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Users = () => {

  const users = useSelector( (state) => state.user )

  if (!users) {
    return null
  }
  return (
    <Box sx={{
      marginTop: 3
    }}>
      <Typography variant="h4" component="h4">
        List of users
      </Typography>
      {users.map( (user) => (
        <ListItem key={user.id}>
          <ListItemText primary={user.email} secondary={user.name}/>
        </ListItem>
      )
      )}
    </Box>
  )
}

export default Users