# Vagrant :simple-vagrant:
-------------------------------------------

Vagrant adalah alat yang digunakan untuk membuat virtual machine secara otomatis, kita hanya perlu membuat sebuah `Vagrantfile`. Alat pembuat virtual machine yang didukung adalah `Virtual Box`, `VMware`, `Hyper-V` dan lainnya.
Sebuah base OS seperti Ubuntu, CentOS dan lain-lain disebut dengan **box**.

### Install

Untuk menginstall bisa dilihat di [Vagrant Install Dokumentasi.](https://developer.hashicorp.com/vagrant/install)

**Command**

* Menambahkan ke repository:
```bash
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list

```

* Update dan Install Vagrant
```bash
sudo apt update && sudo apt install vagrant
```

### Command (CLI)

* Inisialisasi direktori saat ini menjadi lingkungan  Vagrant 
```bash
vagrant init BOX-NAME
```

* Menghapus VM yang sudah dibuat
```bash
vagrant destroy VM-NAME
```

* Melihat status dari VM yang terbuat
```bash
vagrant status VM-NAME
```

* Membuat VM dari Vagrantfile atau Menghidupkan VM yang ada
```bash
vagrant up
```

* Shutdown VM
```bash
vagrant halt
```

* Masuk ke dalam VM yang sudah dibuat menggunakan SSH
```bash
vagrant ssh VM-NAME
```

* Untuk menambahkan box
```bash
vagrant box add ADDRESS
```

* Untuk melihat box yang sudah terinstall
```bash
vagrant box list
```

* Untuk menghapus box
```bash
vagrant box remove NAME
```

### Vagrantfile

**Vagrantfile** di bawah ini akan membuat 2 VM dengan base `ubuntu/trusty64`
dengan nama **app** dan **db**. Dan VM yang terbuat sudah terinstall **apache2**

**Example**

```vagrant title="Vagrantfile"
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Nama box yang akan digunakan
  config.vm.box = "ubuntu/trusty64"
  config.vm.box_version = "20191107.0.0"

  # Definisi untuk memberitahu vagrant bahwa kita menggunakan 
  # virtualbox sebagai provider
  # Konfigurasi spesifikasi dari virtualbox yang akan dibuat
  config.vm.provider "virtualbox" do |vb|
    vb.gui = false  
    vb.memory = "1024"
    vb.cpus = 1
    vb.linked_clone = true
  end

  # Definisi untuk VM yang dibuat dengan nama app 
  # dan konfigurasi network yang diterapkan
  config.vm.define "app" do |app|
    app.vm.network :private_network, ip: "10.10.10.20"
  end

  # Definisi untuk VM yang dibuat dengan nama db
  # dan konfigurasi network yang diterapkan
  config.vm.define "db" do |db|
    db.vm.network :private_network, ip: "10.10.10.21"
  end

  # Code di bawah ini akan dijalankan pada saat vagrant berhasil membuat VM 
  # atau pada saat kita menjalankan vagrant up
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y apache2
  SHELL
end
```

Untuk lebih lengkapnya dapat melihat di [Vagrant Documentation](https://developer.hashicorp.com/vagrant/docs)


