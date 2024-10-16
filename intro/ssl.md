# Gerando Certificados SSL - Autoassinados

Para gerar certificados SSL, você pode usar o OpenSSL. O OpenSSL é uma biblioteca de criptografia de código aberto que é usada por muitos aplicativos e serviços para habilitar a criptografia SSL/TLS.

Para gerar um certificado SSL autoassinado, você pode usar o seguinte comando:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout certificado_auto_assinado.key -out certificado_auto_assinado.crt -subj "/C=BR/ST=SantaCatarina/L=Videira/O=Bizotto/OU=TI/CN=professor.net"
```

Este comando gera um certificado SSL autoassinado válido por 365 dias. O certificado é gerado com uma chave privada RSA de 2048 bits e é salvo em dois arquivos:

- `certificado_auto_assinado.key`: A chave privada do certificado.
- `certificado_auto_assinado.crt`: O certificado SSL autoassinado.

Você pode usar o certificado e a chave privada gerados para configurar um servidor web para usar SSL/TLS.

# Gerando Certificados SSL - Assinado por uma Autoridade de Certificação

Para gerar um certificado SSL assinado por uma autoridade de certificação, você pode usar o seguinte comando:

```bash
openssl req -new -newkey rsa:2048 -nodes -keyout chave_privada.key -out pedido_certificado.csr -subj "/C=BR/ST=SantaCatarina/L=Videira/O=Bizotto/OU=TI/CN=professor.net"
```

Depois de gerar o pedido de certificado, você pode enviá-lo para uma autoridade de certificação para assinatura. A autoridade de certificação irá verificar a sua identidade e, em seguida, assinar o certificado.

Depois de receber o certificado assinado, você pode combiná-lo com a chave privada para formar um certificado SSL completo:

```bash
cat certificado.crt chave_privada.key > certificado_completo.crt
```

Você pode usar o certificado completo para configurar um servidor web para usar SSL/TLS.