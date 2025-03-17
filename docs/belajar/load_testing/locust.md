# Locust :material-chart-timeline-variant:
-------------------------------------------

Locust adalah alat sumber terbuka berbasis **Python** untuk melakukan **load testing** pada aplikasi web. Locust memungkinkan pengguna untuk mensimulasikan ribuan pengguna secara bersamaan untuk menguji performa API, website, atau aplikasi berbasis HTTP.

### Install

Untuk menginstall bisa dilihat di [Locust Install Dokumentasi.](https://docs.locust.io/en/stable/installation.html)

**Command**

* Install [Python](https://docs.python-guide.org/starting/installation/) (jika anda belum menginstalasinya):

* Install Locust
```bash
pip3 install locust
```

### Command (CLI)

* Menjalankan program locust 
```bash
locust -f locustfile.py
```

### Locustfile

Pengujian **Locust** pada dasarnya hanyalah sebuah program Python yang membuat permintaan ke sistem yang ingin Anda uji. Hal ini membuatnya sangat fleksibel dan sangat baik dalam mengimplementasikan alur pengguna yang kompleks.

**Example**

```python title="locustfile.py"
import logging
from locust import HttpUser, task, between
from random import randint

PRODUCT_IDS = [9547, 9555, 9343, 10719, 10724]
ACCOUNT_IDS = []

_logger = logging.getLogger(__name__)

class BaseUser(HttpUser):
    wait_time = between(1, 3)
    host = 'http://localhost:9004'
    database = 'cbtl_180225'
    session = None
    abstract = True

    @classmethod
    def get_credentials(cls):
        return None, None

    def _get_request_header(self):
        return {
            'Content-Type': 'application/json',
            'X-Session-Id': self.session,
        }

    def on_start(self):
        _logger.info(f'START {self.__class__.__name__.upper()}')
        self.login()

    def on_stop(self):
        _logger.info(f'STOP {self.__class__.__name__.upper()}')

    def login(self):
        """ Login ke Odoo menggunakan endpoint API autentikasi. """
        username, password = self.get_credentials()
        if not username or not password:
            print("Username dan password harus diisi!")
            return

        payload = {
            'jsonrpc': '2.0',
            'params': {
                'db': self.database,
                'login': username,
                'password': password
            }
        }
        response = self.client.post('/web/session/authenticate', json=payload)
        if response.status_code == 200 and response.json().get('result', {}).get('uid'):
            self.session = response.cookies.get('session_id')
            _logger.info(f'Login {username} berhasil!')
        else:
            self.stop()
            _logger.error(f'Gagal login {username}: {response.text}')

    def odoo_call(self, model, method, *args, **kwargs):
        if not self.session:
            print('Tidak ada session. Pastikan login berhasil.')
            return None

        payload = {
            'jsonrpc': '2.0',
            'method': 'call',
            'params': {
                'model': model,
                'method': method,
                'args': list(args),
                'kwargs': kwargs
            },
        }
        response = self.client.post('/web/dataset/call_kw', json=payload, headers=self._get_request_header()).json()
        return {
            'success': 'result' in response,
            'response': response.get('result') or response.get('error', {})
        }

class AdminUser(BaseUser):
    weight = 1  # 100 user

    @classmethod
    def get_credentials(cls):
        return 'admin', '4dm1nodoo14c2023'

    @task
    def load_testing_search_valuations(self):
        domain = []
        len_valuations = self.odoo_call('stock.valuation.layer', 'search_count', domain)
        pages = int(len_valuations['response'])
        for page in range(1, pages, 80):
            valuations = self.odoo_call('stock.valuation.layer', 'search', domain, limit=80, offset=page, order='id ASC')
            if valuations['success']:
                _logger.info('Success Get Valuation')
            else:
                _logger.warning('Failed Get Valuation')
```

Untuk lebih lengkapnya dapat melihat di [Locust Documentation](https://docs.locust.io/en/stable/quickstart.html)


