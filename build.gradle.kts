plugins {
    kotlin("jvm") version("1.2.10")
    id("idea")
    id("org.springframework.boot") version("1.5.10.RELEASE")
}

repositories {
    jcenter() 
}

dependencies {
    implementation(kotlin("stdlib", "1.2.10"))
    implementation("org.springframework.boot:spring-boot-starter-web:1.5.10.RELEASE")
}