FROM julia:1.8

WORKDIR /app

COPY Project.toml .
RUN julia -e 'using Pkg; Pkg.add(["JuMP", "Ipopt", "HTTP", "JSON", "Distributions", "LinearAlgebra", "Statistics"])'

COPY . .

EXPOSE 8082

CMD ["julia", "optimization.jl"] 