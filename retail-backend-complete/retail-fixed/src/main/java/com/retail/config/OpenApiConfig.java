package com.retail.config;

import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.info.*;
import io.swagger.v3.oas.models.security.*;
import org.springframework.context.annotation.*;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .info(new Info().title("Smart Retail Management System API")
                .description("REST API for Retail Management, Analytics and Inventory Prediction")
                .version("1.0.0").contact(new Contact().name("Vamsi").email("vamsi@retail.com")))
            .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
            .components(new Components().addSecuritySchemes("Bearer Authentication",
                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer")
                    .bearerFormat("JWT").description("Enter JWT token")));
    }
}
