# Docker :simple-docker:
-------------------------------------------

Docker adalah platform perangkat lunak open-source yang memungkinkan pengembang untuk membangun, menguji, dan menyebarkan aplikasi dengan cepat. Docker mengemas perangkat lunak ke dalam unit standar yang disebut kontainer, yang berisi semua yang dibutuhkan untuk menjalankan aplikasi.

## Docker Dasar
-------------------------------------------
Container berfokus pada aplikasi. Container sendiri sebenarnya berjalan di atas aplikasi Container Manager yang berjalan di sistem operasi. Container akan menggunakan sistem operasi host dimana Container Manager berjalan. Dan Docker merupakan sebuah Container Manager.


### Install

Untuk menginstall docker bisa dilihat [Docker Docs.](https://docs.docker.com/get-started/get-docker/)


### Docker Registry

Docker Registry merupakan sebuah tempat untuk menyimpan image. Dengan menggunakan Docker Registry, kita bisa menyimpan image yang kita buat dan bisa digunakan di Docker Daemon dimanapun selama bisa terkoneksi ke Docker Registry. Dan kita juga bisa menggunakan image yang sudah dibuat oleh orang lain.

**Beberapa Docker Registry**

* [Docker Hub](https://hub.docker.com/)
* [Digital Ocean Container Registry](https://www.digitalocean.com/products/container-registry)
* [Google Cloud Container Registry](https://cloud.google.com/container-registry)
* [Amazon Elastic Container Registry](https://aws.amazon.com/id/ecr)
* [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry)


### Image
-------------------------------------------

Docker Image mirip seperti installer aplikasi, dimana di dalam Docker Image terdapat aplikasi dan dependency. Image yang digunakan oleh Container tidak bisa dihapus.

**Command**

* Melihat daftar image
```bash 
docker image ls 
```

* Mendownload image dari docker registry, default tag `latest`
```bash
docker image pull [image-name:tag]
```

* Menghapus satu atau lebih image
```bash
docker image rm [image-name:tag]
```


### Volume

Volume mirip dengan Bind Mounts, bedanya adalah terdapat management Volume, dimana kita bisa membuat, menghapus, dan melihat daftar Volume.

Volume sendiri bisa dianggap storage yang digunakan untuk menyimpan data, bedanya dengan Bind Mounts, pada Bind Mounts, data disimpan pada sistem host, sedangkan pada Volume, data di manage oleh Docker.

**Command**

* Membuat volume baru
```bash 
docker volume create [volume-name] 
```

* Melihat daftar volume
```bash
docker volume ls
```

* Menghapus satu atau lebih volume
```bash
docker volume rm [volume-name]
```


### Container

Satu Docker Image bisa digunakan oleh beberapa Docker Container dengan syarat nama Docker Container berbeda.

**Command**

* Melihat semua container
```bash 
docker container ls -a 
```

* Melihat container yang sedang berjalan
```bash
docker volume ls
```

* Membuat container baru
```bash
docker container create --name [container-name] [image-name:tag]
```

* Menjalankan container
```bash
docker container start [container-name/container-id]
```

* Menghentikan container
```bash
docker container stop [container-name/container-id]
```

* Menghapus container
```bash
docker container rm [container-name/container-id]
```


#### Container Log

Container Log digunakan untuk melihat log aplikasi di container.

**Command**

* Melihat log aplikasi di container
```bash 
docker container logs [container-name/container-id]
```

* Melihat log aplikasi di container secara real-time
```bash
docker container logs -f [container-name/container-id]
```


#### Container Exec

Container Exec digunakan untuk masuk ke dalam container itu sendiri. Container Exec dapat digunakan untuk mengeksekusi kode program yang ada di dalam container.

**Command**

* Masuk ke dalam container dan mengeksekusi kode program
```bash 
docker container exec -i -t [container-name/container-id] [command-to-execute]

# -i untuk menjaga input tetap aktif
# -t untuk alokasi pseudo-TTY (terminal akses)
```


#### Container Port

Container pada dasarnya terisolasi di dalam Docker (Sistem Host tidak bisa mengakses aplikasi yang terdapat di dalam Container). Salah satu cara untuk mengaksesnya adalah menggunakan Container Exec.

Selain Container Exec kita juga bisa melakukan port forwarding yaitu meneruskan sebuah port yang terdapat di sistem Host ke dalam Docker Container

**Command**

* Melakukan port forwarding
```bash 
docker container create --name [container-name] --publish [port-host:port-container] [image-name:tag]
```


#### Container Environment Variable

Digunakan untuk mengubah-ubah konfigurasi aplikasi secara dinamis.

**Command**

* Manambahkan environment variable
```bash 
docker container create --name [container-name] --env [KEY1=VALUE1] --env [KEY2=VALUE2] [image-name:tag]
```


#### Container Stats

Digunakan untuk penggunaan resource yang digunakan oleh masing-masing container.

* Melihat penggunaan resource yang digunakan oleh container
```bash 
docker container stats
```

| CONTAINER ID |      NAME      |CPU %|MEM USAGE / LIMIT |MEM %|NET I/O        |BLOCK I/O      |PIDS|
|--------------|----------------|-----|------------------|-----|---------------|---------------|----|
| 420cb284a23d | contohpostgres |0.00%|22.29MiB / 7.64GiB|0.28%|16.9kB / 3.58kB|15.9MB / 23.1MB|6   |


#### Container Resource Limit


#### Container Volume



## Dockerfile
-------------------------------------------



**Example**

```docker title="Dockerfile"
FROM ubuntu

# Install vnc, xvfb in order to create a 'fake' display and firefox
RUN apt-get update && apt-get install -y x11vnc xvfb firefox
RUN mkdir ~/.vnc

# Setup a password
RUN x11vnc -storepasswd 1234 ~/.vnc/passwd

# Autostart firefox (might not be the best way, but it does the trick)
RUN bash -c 'echo "firefox" >> /.bashrc'

EXPOSE 5900
CMD ["x11vnc", "-forever", "-usepw", "-create"]
```

## Docker Compose
-------------------------------------------

