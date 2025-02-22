# AI Polyglot System

Bu proje, farklı programlama dillerinin güçlü yanlarını kullanarak kapsamlı bir yapay zeka sistemi oluşturmayı amaçlamaktadır. Sistem, aşağıdaki bileşenlerden oluşmaktadır:

## Bileşenler

1. **Python (AI Model ve NLP)**
   - BERT tabanlı metin analizi
   - Derin öğrenme modeli
   - FastAPI tabanlı REST API

2. **R (İstatistiksel Analiz)**
   - Gelişmiş istatistiksel analiz
   - Veri görselleştirme
   - Zaman serisi analizi

3. **Julia (Optimizasyon)**
   - Matematiksel optimizasyon
   - Bayesian optimizasyon
   - Yüksek performanslı hesaplama

4. **Rust (Sistem Optimizasyonu)**
   - Yüksek performanslı veri işleme
   - Paralel hesaplama
   - Sistem seviyesi optimizasyonlar

5. **TypeScript/JavaScript (Web Arayüzü)**
   - React tabanlı modern UI
   - Material-UI bileşenleri
   - Gerçek zamanlı veri görselleştirme

## Docker ile Kurulum

Projeyi Docker ile çalıştırmak için:

```bash
# Tüm servisleri başlatmak için
docker-compose up -d

# Servislerin durumunu kontrol etmek için
docker-compose ps

# Logları görüntülemek için
docker-compose logs -f

# Servisleri durdurmak için
docker-compose down
```

### Docker Compose Servisleri

- Redis: Önbellek ve veri depolama
- Gateway (Go): API Gateway ve servis koordinasyonu
- Python Service: AI ve NLP işlemleri
- R Service: İstatistiksel analiz
- Julia Service: Optimizasyon işlemleri
- Rust Service: Sistem optimizasyonları
- Frontend: Web arayüzü

## Manuel Kurulum

Her bir bileşen için gerekli kurulum adımları:

### Python
```bash
cd python
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

### R
```bash
cd r_analytics
Rscript -e "install.packages(c('tidyverse', 'caret', 'randomForest', 'plumber'))"
Rscript statistical_analysis.R
```

### Julia
```bash
cd julia
julia
]add JuMP Ipopt HTTP JSON Distributions LinearAlgebra Statistics
julia optimization.jl
```

### Rust
```bash
cd rust
cargo build --release
cargo run
```

### TypeScript/JavaScript
```bash
cd javascript
npm install
npm run dev
```

## API Endpoints

- Python API: http://localhost:8084
- R API: http://localhost:8081
- Julia API: http://localhost:8082
- Rust API: http://localhost:8083
- Web UI: http://localhost:3000
- API Gateway: http://localhost:8080

## Sistem Mimarisi

```
                   +----------------+
                   |    Web UI     |
                   | (TypeScript)  |
                   +----------------+
                          |
                          v
                   +----------------+
                   |  API Gateway  |
                   |     (Go)      |
                   +----------------+
                          |
            +------------+------------+
            |            |            |
    +----------+  +-----------+ +-----------+
    |  Python  |  |     R     | |   Julia   |
    |   (AI)   |  | (Stats)   | |  (Opt)    |
    +----------+  +-----------+ +-----------+
         |             |             |
         +-------------+-------------+
                      |
               +-----------+
               |   Rust    |
               | (System)  |
               +-----------+
```

## Özellikler

- Çok dilli mimari
- Yüksek performanslı hesaplama
- Ölçeklenebilir tasarım
- Modern web arayüzü
- Gerçek zamanlı analiz
- Kapsamlı API desteği
- Docker konteynerizasyonu

## Gereksinimler

Docker ile kurulum için:
- Docker 20.10+
- Docker Compose 2.0+

Manuel kurulum için:
- Python 3.8+
- R 4.0+
- Julia 1.8+
- Rust 1.68+
- Node.js 16+
- Go 1.20+

## Lisans

MIT

## Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit'leyin (`git commit -m 'Add amazing feature'`)
4. Branch'i push'layın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun 