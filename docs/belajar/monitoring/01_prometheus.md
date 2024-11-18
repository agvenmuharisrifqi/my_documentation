# Catatan Belajar Prometheus 📝
-------------------------------------------

Prometheus mengumpulkan dan menyimpan metriknya sebagai data deret waktu, yaitu informasi metrik disimpan dengan stempel waktu saat direkam, di samping pasangan nilai-kunci opsional yang disebut label.


## Install
-------------------------------------------

* Download source [prometheus](https://prometheus.io/download/#prometheus)
```bash
wget [prometheus-link]
```

* Ekstrak prometheus yang sudah didownload
```bash
tar -xvz [prometheus-file-zip]
```

* Menambahkan group baru dengan nama `prometheus`
```bash
sudo groupadd --system prometheus
```

* Menambahkan user baru dengan nama `prometheus` tanpa menggunakan login dan menambahkannya ke dalam group `prometheus` yang sudah dibuat
```bash
sudo useradd --system prometheus -s /sbin/nologin -g prometheus
```

* Memindahkan file executable (`prometheus`, `promtool`) ke direktori `/usr/local/bin`
```bash
sudo mv prometheus promtool /usr/local/bin
```

* Membuatkan directory config prometheus di `/etc`
```bash
sudo mkdir /etc/prometheus
```

* Memindahkan file config ke dalam directory config yang sudah dibuat
```bash
sudo mv console_libraries consoles prometheus.yml /etc/prometheus
```

* Membuatkan directory untuk menyimpan data prometheus di `/var/lib`
```bash
sudo mkdir /var/lib/prometheus
```

* Merubah hak akses directory yang digunakan untuk menyimpan data
```bash
sudo chown -R prometheus:prometheus /var/lib/prometheus
```

* Membuat service untuk menjalankan prometheus
```bash
sudo nano /etc/systemd/system/prometheus.service
```

* Isi dari `prometheus.service`
```bash
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

* Reload systemd
```bash
sudo systemctl daemon-reload
```

* Enable Prometheus
```bash
sudo systemctl enable prometheus
```

* Start prometheus
```bash
sudo systemctl start prometheus
```

* Cek status prometheus service
```bash
sudo systemctl status prometheus
```


## Add-ons
-------------------------------------------

Prometheus menyediakan beberapa addons untuk mendapatkan data metrik, yaitu :


### Node Exporter

Node Exporter dapat digunakan untuk mengumpulkan metrik perangkat keras dan OS yang diekspos oleh kernel.

#### Install
-------------------------------------------

* Download source [node-exporter](https://prometheus.io/download/#node_exporter)
```bash
wget [prometheus-link]
```

* Ekstrak prometheus yang sudah didownload
```bash
tar -xvz [prometheus-file-zip]
```





