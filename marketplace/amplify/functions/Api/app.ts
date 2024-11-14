import express from "express";
import bodyParser from "body-parser";
import { PaymentController } from './api/PaymentController'
import { AuthController } from "./api/AuthController";
import { ProductController } from "./api/ProductController";
import { NFTController } from "./api/NFTController";

const app = express();
app.set("trust proxy", true);
app.use(bodyParser.json({ limit: '10mb' }));

// Enable CORS for all methods
app.use(function (req, res, next) {
  if (process.env.AMPLIFY_BACKEND_NAME === 'production') {
    res.header("Access-Control-Allow-Origin", "*")
  } else {
    res.header("Access-Control-Allow-Origin", "*")
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.header("X-FRAME-OPTIONS", "DENY");
  res.header("Cache-Control", "no-store");
  res.header("Pragma", "no-cache");
  res.header("X-XSS-Protection", "1");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("Strict-Transport-Security", "max-age=31536000");
  next()
});

// sessionKey 必須のAPI.
app.post('/api/payment', PaymentController.createPaymentUrl);
app.get('/api/product/order', ProductController.getProductOrder);
app.get('/api/nft', NFTController.getNFT);
app.post('/api/session', AuthController.updateSession);
app.get('/api/logout', AuthController.logout);

// public API
app.post('/api/payment/callback', PaymentController.callbackApiPayment);
app.get('/api/product/quantity', ProductController.getProductQuantity);
app.get('/api/userAppUrl', (req: express.Request, res: express.Response) => {
  res.status(200).json({ url: process.env.DATALOCKER_USER_APP_URL }).end();
});

app.use(function (req: express.Request, res: express.Response) {
  res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(3000, function () {
  console.log("App started");
});

export default app;
