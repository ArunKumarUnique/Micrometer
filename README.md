# Spring Boot Monitoring Demo

This project demonstrates how to integrate **Micrometer**, **Prometheus**, and **Grafana** with a Spring Boot application for comprehensive monitoring and observability.

## Features

- **Spring Boot 3.2.1** with Spring Web and JPA
- **Micrometer** for application metrics
- **Prometheus** for metrics collection
- **Grafana** for visualization and dashboards
- **Custom metrics** and business KPIs
- **H2 Database** for demo purposes
- **Docker Compose** for easy setup

## Architecture

```
Spring Boot App → Micrometer → Prometheus → Grafana
```

## Quick Start

### 1. Start the Spring Boot Application

```bash
# Using Maven
./mvnw spring-boot:run

# Or using Java
java -jar target/monitoring-demo-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

### 2. Start Prometheus and Grafana

```bash
docker-compose up -d
```

This will start:
- **Prometheus** on `http://localhost:9090`
- **Grafana** on `http://localhost:3000` (admin/admin)

### 3. Access the Services

- **Application**: http://localhost:8080
- **Actuator Endpoints**: http://localhost:8080/actuator
- **Prometheus Metrics**: http://localhost:8080/actuator/prometheus
- **Prometheus UI**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin)

## API Endpoints

### Demo Endpoints
- `GET /api/hello` - Simple hello endpoint with timing metrics
- `GET /api/users/{id}` - Get user by ID (simulates database calls)
- `POST /api/orders` - Create order (simulates business operations)
- `GET /api/health-check` - Application health status
- `GET /api/simulate-load` - Simulate high CPU usage

### Actuator Endpoints
- `/actuator/health` - Application health
- `/actuator/metrics` - Available metrics
- `/actuator/prometheus` - Prometheus formatted metrics
- `/actuator/info` - Application information

## Custom Metrics

The application includes several custom metrics:

### Counters
- `hello_requests_count` - Number of hello requests
- `user_requests_count` - Number of user requests
- `order_creation_count` - Number of order creation requests
- `application_errors_total` - Total application errors by type

### Timers
- `hello_requests` - Response time for hello endpoint
- `user_requests` - Response time for user endpoint
- `order_creation` - Response time for order creation
- `business_operation_duration` - Custom business operation timing

### Gauges
- `active_users` - Number of currently active users
- `total_order_value` - Total value of all orders

### Distribution Summaries
- `order_value_distribution` - Distribution of order values

## Grafana Dashboard

The project includes a pre-configured Grafana dashboard with:

1. **HTTP Request Rate** - Requests per second by endpoint
2. **HTTP Request Duration** - 95th and 50th percentile response times
3. **Active Users** - Current number of active users
4. **Total Order Value** - Cumulative order value
5. **Error Rate** - Application errors by type

## Testing the Metrics

Generate some load to see metrics in action:

```bash
# Generate requests
for i in {1..100}; do
  curl http://localhost:8080/api/hello
  curl http://localhost:8080/api/users/$((RANDOM % 10 + 1))
  curl -X POST http://localhost:8080/api/orders \
    -H "Content-Type: application/json" \
    -d '{"items": ["item1", "item2"]}'
done

# Simulate load
curl http://localhost:8080/api/simulate-load
```

## Configuration

### Application Configuration (`application.yml`)
- Enables all actuator endpoints
- Configures Prometheus metrics export
- Sets up metric tags and percentiles

### Prometheus Configuration (`prometheus.yml`)
- Scrapes metrics from Spring Boot app every 5 seconds
- Configured to work with Docker networking

### Grafana Configuration
- Auto-provisioned Prometheus datasource
- Pre-loaded dashboard for Spring Boot metrics

## Development

### Adding Custom Metrics

1. **Counter Example**:
```java
@Autowired
private MeterRegistry meterRegistry;

Counter.builder("my.custom.counter")
    .description("Description of counter")
    .tag("type", "custom")
    .register(meterRegistry)
    .increment();
```

2. **Timer Example**:
```java
@Timed(value = "my.operation", description = "My operation timing")
public void myOperation() {
    // Your code here
}
```

3. **Gauge Example**:
```java
Gauge.builder("my.gauge")
    .description("My gauge metric")
    .register(meterRegistry, this, MyClass::getValue);
```

## Production Considerations

1. **Security**: Secure actuator endpoints in production
2. **Performance**: Monitor the impact of metrics collection
3. **Storage**: Configure Prometheus retention policies
4. **Alerting**: Set up Grafana alerts for critical metrics
5. **Scaling**: Consider Prometheus federation for multiple instances

## Troubleshooting

### Common Issues

1. **Metrics not appearing in Prometheus**:
   - Check if Spring Boot app is running
   - Verify Prometheus can reach `host.docker.internal:8080`
   - Check actuator endpoints are enabled

2. **Grafana dashboard not loading**:
   - Verify Prometheus datasource is configured
   - Check if metrics exist in Prometheus
   - Ensure dashboard JSON is valid

3. **Docker networking issues**:
   - Use `host.docker.internal` instead of `localhost` in Docker
   - Check if ports are properly exposed

## Next Steps

- Add custom business metrics
- Implement distributed tracing with Zipkin/Jaeger
- Set up alerting rules in Prometheus
- Create custom Grafana dashboards
- Implement log aggregation with ELK stack