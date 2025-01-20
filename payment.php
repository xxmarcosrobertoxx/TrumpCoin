<?php
// Configurações do Mercado Pago
require 'vendor/autoload.php';  // Certifique-se de ter o SDK do Mercado Pago instalado via Composer

// Defina o Access Token
MercadoPago\SDK::setAccessToken('SEU_ACCESS_TOKEN_AQUI');

// Criação de preferência de pagamento
$preference = new MercadoPago\Preference();
$item = new MercadoPago\Item();
$item->title = 'Investimento TrumpCoin';
$item->quantity = 1;
$item->unit_price = 10.00;  // Valor do investimento

$preference->items = array($item);
$preference->back_urls = array(
    "success" => "http://www.sua-url-de-sucesso.com",
    "failure" => "http://www.sua-url-de-falha.com",
    "pending" => "http://www.sua-url-de-pendente.com"
);

$preference->save();

// Criação do pagamento com QR Code do Pix
$payment = new MercadoPago\Payment();
$payment->transaction_amount = 10.00;  // Valor do pagamento
$payment->token = "seu-token-de-cartao-aqui";  // Se estiver usando cartão
$payment->description = "Investimento TrumpCoin";
$payment->payment_method_id = "pix";
$payment->save();

// Retorna a URL do QR Code gerado
echo json_encode(array("qr_code_url" => $payment->point_of_interaction->transaction_data->qr_code));
?>
