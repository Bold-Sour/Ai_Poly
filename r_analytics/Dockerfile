FROM r-base:4.2.0

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    && rm -rf /var/lib/apt/lists/*

RUN R -e "install.packages(c('tidyverse', 'caret', 'randomForest', 'plumber', 'moments', 'forecast'), repos='https://cloud.r-project.org/')"

COPY . .

EXPOSE 8081

CMD ["Rscript", "statistical_analysis.R"] 