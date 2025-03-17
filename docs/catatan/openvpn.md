# OpenVPN :simple-openvpn:
-------------------------------------------

OpenVPN adalah protokol Virtual Private Network (VPN) sumber terbuka yang digunakan untuk membuat koneksi terenkripsi antar perangkat. OpenVPN merupakan salah satu protokol VPN yang paling aman dan populer karena menawarkan tingkat keamanan tinggi, fleksibel, dan kompatibel dengan sebagian besar sistem operasi.

**Command Install**

* Memperbarui daftar paket yang tersedia dan versinya
```bash
sudo apt update
```

* Install OpenVPN
```bash
sudo apt install openvpn
```

**Command to Activate OpenVPN**

Untuk mengaktifkan OpenVPN di ubuntu 22.04 perlu menjalankan beberapa perintah antara lain :

* Mengimport config OpenVPN agar dapat dengan mudah digunakan kembali
```bash
openvpn3 config-import --config [path-to-ovpn-config] --name [CONFIG_NAME] --persistent
```

* Jangan dilakukan jika tidak kebutuhan darurat
```bash
openvpn3 config-manage --config [CONFIG_NAME] --allow-compression yes
```

* Menjalankan OpenVPN
```bash
openvpn3 session-start --config [CONFIG_NAME]
```

* Memasukkan username & password
