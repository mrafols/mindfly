// Script de verificación de variables de entorno para Next.js
const fs = require('fs');
const path = require('path');

console.log('\n🔍 Verificando configuración de AeroDataBox...\n');

const envLocalPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envLocalPath)) {
  console.log('❌ Archivo .env.local NO encontrado');
  console.log('\n📝 Crea el archivo .env.local con:');
  console.log('   AERODATABOX_API_KEY=tu_api_key_aqui\n');
  process.exit(1);
}

const envContent = fs.readFileSync(envLocalPath, 'utf8');
const apiKeyMatch = envContent.match(/AERODATABOX_API_KEY=(.+)/);

if (apiKeyMatch && apiKeyMatch[1]) {
  const apiKey = apiKeyMatch[1].trim();
  console.log('✅ Archivo .env.local encontrado');
  console.log('✅ AERODATABOX_API_KEY configurada');
  console.log(`   Longitud: ${apiKey.length} caracteres`);
  console.log(`   Primeros 10 caracteres: ${apiKey.substring(0, 10)}...`);
  console.log(`   Últimos 4 caracteres: ...${apiKey.slice(-4)}`);
  console.log('\n✨ La API está lista para usar en desarrollo local!');
  console.log('   Ejecuta: npm run dev\n');
} else {
  console.log('❌ AERODATABOX_API_KEY NO encontrada en .env.local');
  console.log('\n📝 Añade en .env.local:');
  console.log('   AERODATABOX_API_KEY=tu_api_key_aqui\n');
  process.exit(1);
}
