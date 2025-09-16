# NAT VPS :material-server:
-------------------------------------------

NAT VPS (Network Address Translation Virtual Private Server) adalah jenis VPS (Virtual Private Server) yang tidak mendapatkan alamat IP publik khusus untuk dirinya sendiri.

Sebaliknya, beberapa NAT VPS berbagi satu alamat IP publik yang sama, dan penyedia VPS menggunakan teknologi NAT (Network Address Translation) untuk meneruskan lalu lintas jaringan antara alamat IP publik tersebut dan alamat IP internal (privat) dari masing-masing VPS.

**Provider**

* [Hostdata](https://hostdata.id/){:target="\_blank"}
* [NyanHosting](https://nyanhosting.id/){:target="\_blank"}
* [Whplus](https://www.whplus.com/){:target="\_blank"}
* [WeDoHosting](https://www.wdh.fr/en/vps/nat){:target="\_blank"}

### Systemd Service

Agar website kita dapat berjalan di background maka kita perlu membuat service

* Buat file baru di direktori `systemd`
```bash
sudo nano /etc/systemd/system/app.service
```

* Contoh file service
```bash
[Unit]
Description=Odoo 17 Calhoun
After=network.target

[Service]
Type=simple
User=odoo
Group=odoo
ExecStart=/opt/odoo17g_calhoun/Env/bin/python3.10 /opt/odoo17g_calhoun/odoo-bin -c /etc/odoo17g_calhoun.conf
WorkingDirectory=/opt/odoo17g_calhoun/
StandardOutput=journal
StandardError=journal
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

* Aktifkan dan mulai service
```bash
sudo systemctl daemon-reload
sudo systemctl enable app.service
sudo systemctl start app.service
```

* Periksa status service
```bash
sudo systemctl status app.service
```

* Untuk memeriksa log service
```bash
journalctl -u app.service
```

### Web Server

Agar web server kita dapat diakses dari luar harus menggunakan tunneling. disini saya menggunakan cloudflare tunnel.

**Setting Nginx**

* Install Nginx
```bash
apt install nginx
```

* Hapus default file di `/etc/nginx/sites-enabled/`
```bash
sudo unlink /etc/nginx/sites-enabled/default
```

* Hapus default file di `/etc/nginx/sites-available/` dan `/etc/nginx/sites-enabled/`
```bash
rm default
```

* Buat file dengan nama domain anda
```bash
nano /etc/nginx/sites-available/example.com
```

* Contoh file nginx untuk odoo
```nginx
upstream odoo {
    server 127.0.0.1:8069;
}

upstream odoochat {
	server 127.0.0.1:8072;
}

server {
    listen [::]:80;
    server_name example.com www.example.com;

    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log;

    #proxy_buffers 16 64k;
    #proxy_buffer_size 128k;

    location / {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        if ($request_method = 'POST') {
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
        }
        if ($request_method = 'GET') {
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
        }
        proxy_pass http://odoo;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }

    location /longpolling {
        proxy_pass http://odoochat;
    }
}
```

* Kemudian buat file executable di sites-enabled
```bash
ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

**Setting Certbot Lets Encrypt**

* Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx
```

* Memasang SSL Sertifikat di Konfigurasi Nginx Anda
```bash
sudo certbot --nginx -d example.com -d www.example.com
```

* Kemudian masukan informasi yang diperlukan sesuai dengan informasi yang di domain anda

* Verifikasi Certbot Auto-Renewal
```bash
sudo systemctl status certbot.timer
```

* Tes renewal process
```bash
sudo certbot renew --dry-run
```

**Setting Host**

* Edit konfigurasi pada file `/etc/hosts`
```bash
nano /etc/hosts
```

* Tambahkan konfigurasi ini
```bash
127.0.0.1       example.com
```

**Setting Domain di CloudFlare**

Langkah pertama yang harus dilakukan tambahkan nama_domain anda pada cloudflare
![Home Page](/my_documentation/assets/img/server/nat_vps/cloudflare_1.png){ loading=lazy }

Kemudian masukan nama_domain anda
![Register ](/my_documentation/assets/img/server/nat_vps/cloudflare_2.png){ loading=lazy }

Kemudian arahkan domain anda ke nameserver cloudflare
![Image title](/my_documentation/assets/img/server/nat_vps/cloudflare_3.png){ loading=lazy }

Lalu tambahkan record untuk ipv6 menggunakan Type AAAA,tambahkan sesuai Ipv6 anda.
![Image title](/my_documentation/assets/img/server/nat_vps/cloudflare_4.png){ loading=lazy }

Kemudian tunggu beberapa saat dan coba domain anda di browser.

Untuk lebih lengkapnya dapat melihat di [Tutorial Cara Menghosting website di Nat VPS menggunakan IPv6](https://hostdata.id/domain/tutorial-cara-menghosting-website-di-nat-vps-menggunakan-ipv6/)

