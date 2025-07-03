import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';

const CartDrawer = ({ open, onClose, cart, removeFromCart }) => {
  const totalPrice = cart.reduce((sum, item) => sum + (item.prix * item.quantity), 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 350, padding: '1rem' }}>
        <Typography variant="h6" gutterBottom>
          Your Cart
        </Typography>
        <Divider />
        
        {cart.length === 0 ? (
          <Typography variant="body1" style={{ marginTop: '1rem' }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            <List>
              {cart.map((item) => (
                <ListItem key={item._id} secondaryAction={
                  <IconButton edge="end" onClick={() => removeFromCart(item._id)}>
                    {item.quantity > 1 ? <RemoveIcon /> : <DeleteIcon />}
                  </IconButton>
                }>
                  <ListItemText
                    primary={`${item.reference} (x${item.quantity})`}
                    secondary={`${item.prix} DT each`}
                  />
                </ListItem>
              ))}
            </List>
            
            <Divider />
            <Typography variant="h6" style={{ margin: '1rem 0' }}>
              Total: {totalPrice.toFixed(2)} DT
            </Typography>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;