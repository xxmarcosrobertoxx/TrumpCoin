<?php
// Configuração do Mercado Pago
require 'vendor/autoload.php'; // Certifique-se de ter o SDK do Mercado Pago instalado via Composer

// Defina a chave pública e o access token
MercadoPago\SDK::setAccessToken('APP_USR-5592641771064909-011400-5c0fac8b0a1bb1d197fd6d724d1446eb-2181716049');

// Recebe o valor do investimento enviado pelo front-end
$data = json_decode(file_get_contents('php://input'), true);
$amount = $data['amount'];

// Criação de preferência de pagamento
$preference = new MercadoPago\Preference();
$item = new MercadoPago\Item();
$item->title = 'Investimento TrumpCoin';
$item->quantity = 1;
$item->unit_price = $amount; // O valor do investimento

$preference->items = array($item);
$preference->payment_methods = array(
    "excluded_payment_types" => array(
        array("id" => "ticket")
    ),
    "installments" => 1
);

// URLs de retorno para o pagamento
$preference->back_urls = array(
    "success" => "http://www.sua-url-de-sucesso.com",
    "failure" => "http://www.sua-url-de-falha.com",
    "pending" => "http://www.sua-url-de-pendente.com"
);

// Salva a preferência
$preference->save();

// Criação do pagamento com QR Code do Pix
$payment = new MercadoPago\Payment();
$payment->transaction_amount = $amount; // Valor do pagamento
$payment->description = "Investimento TrumpCoin";
$payment->payment_method_id = "pix";
$payment->preference_id = $preference->id;
$payment->save();

// Retorna a URL do QR Code gerado
echo json_encode(array("qr_code_url" => $payment->point_of_interaction->transaction_data->qr_code));
?>
