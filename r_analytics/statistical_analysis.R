# Install and load required packages
if (!require("tidyverse")) install.packages("tidyverse")
if (!require("caret")) install.packages("caret")
if (!require("randomForest")) install.packages("randomForest")
if (!require("plumber")) install.packages("plumber")

library(tidyverse)
library(caret)
library(randomForest)
library(plumber)

#* @apiTitle AI Statistical Analysis API
#* @apiDescription R-based statistical analysis endpoints for AI system

#* Perform statistical analysis on numerical data
#* @param data Input data frame
#* @post /analyze
function(data) {
    # Convert input to data frame
    df <- as.data.frame(data)
    
    # Basic statistical analysis
    basic_stats <- list(
        summary = summary(df),
        correlation = cor(df),
        variance = apply(df, 2, var),
        skewness = apply(df, 2, function(x) moments::skewness(x))
    )
    
    # Advanced analysis
    pca_result <- prcomp(df, scale. = TRUE)
    
    # Anomaly detection using Isolation Forest
    iso_forest <- isolation.forest(df, ntrees = 100)
    anomalies <- predict(iso_forest, df)
    
    # Time series analysis if applicable
    if ("timestamp" %in% colnames(df)) {
        ts_analysis <- list(
            decomposition = decompose(ts(df$value, frequency = 12)),
            forecast = forecast::auto.arima(ts(df$value))
        )
    }
    
    # Return results
    return(list(
        basic_statistics = basic_stats,
        pca = list(
            loadings = pca_result$rotation,
            variance_explained = summary(pca_result)$importance
        ),
        anomalies = anomalies,
        timestamp = Sys.time()
    ))
}

#* Generate visualizations for the analysis
#* @param data Input data frame
#* @post /visualize
function(data) {
    df <- as.data.frame(data)
    
    # Create various plots
    plots <- list()
    
    # Correlation heatmap
    plots$correlation <- ggplot(data = reshape2::melt(cor(df))) +
        geom_tile(aes(x = Var1, y = Var2, fill = value)) +
        scale_fill_gradient2(low = "blue", high = "red", mid = "white", 
                           midpoint = 0, limit = c(-1,1)) +
        theme_minimal() +
        labs(title = "Correlation Heatmap")
    
    # Distribution plots
    plots$distributions <- lapply(names(df), function(col) {
        ggplot(df, aes_string(x = col)) +
            geom_histogram(bins = 30) +
            theme_minimal() +
            labs(title = paste("Distribution of", col))
    })
    
    # Save plots to temporary files and return paths
    temp_dir <- tempdir()
    plot_paths <- list()
    
    for (name in names(plots)) {
        path <- file.path(temp_dir, paste0(name, ".png"))
        ggsave(path, plots[[name]])
        plot_paths[[name]] <- path
    }
    
    return(plot_paths)
}

# Start the API
pr <- plumber::plumb("statistical_analysis.R")
pr$run(port = 8081) 