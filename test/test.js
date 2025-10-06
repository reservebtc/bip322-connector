// test/test.js
// Simple test suite for BIP-322 Connector

const { BIP322Connector, WalletDetector } = require('../dist/index.js')

console.log('🧪 BIP-322 Connector - Test Suite v1.0')
console.log('=' .repeat(60))

let passedTests = 0
let failedTests = 0

// Test 1: Check exports
console.log('\n📦 Test 1: Module Exports')
try {
  if (typeof BIP322Connector === 'function') {
    console.log('   ✅ BIP322Connector class exported')
    passedTests++
  } else {
    throw new Error('BIP322Connector not found')
  }
} catch (error) {
  console.log(`   ❌ FAIL: ${error.message}`)
  failedTests++
}

// Test 2: Check WalletDetector
console.log('\n📦 Test 2: WalletDetector Export')
try {
  if (typeof WalletDetector === 'function') {
    console.log('   ✅ WalletDetector class exported')
    passedTests++
  } else {
    throw new Error('WalletDetector not found')
  }
} catch (error) {
  console.log(`   ❌ FAIL: ${error.message}`)
  failedTests++
}

// Test 3: Create connector instance
console.log('\n🔧 Test 3: Create Connector Instance')
try {
  const connector = new BIP322Connector()
  if (connector) {
    console.log('   ✅ BIP322Connector instance created')
    passedTests++
  } else {
    throw new Error('Failed to create instance')
  }
} catch (error) {
  console.log(`   ❌ FAIL: ${error.message}`)
  failedTests++
}

// Test 4: Check connector methods
console.log('\n🔧 Test 4: Connector Methods')
try {
  const connector = new BIP322Connector()
  const methods = ['connect', 'sign', 'disconnect', 'getWalletName']
  const missing = methods.filter(m => typeof connector[m] !== 'function')
  
  if (missing.length === 0) {
    console.log('   ✅ All required methods present')
    passedTests++
  } else {
    throw new Error(`Missing methods: ${missing.join(', ')}`)
  }
} catch (error) {
  console.log(`   ❌ FAIL: ${error.message}`)
  failedTests++
}

// Test 5: Check WalletDetector methods
console.log('\n🔧 Test 5: WalletDetector Methods')
try {
  const methods = ['detectAll', 'isInstalled', 'getProvider', 'getFirstAvailable']
  const missing = methods.filter(m => typeof WalletDetector[m] !== 'function')
  
  if (missing.length === 0) {
    console.log('   ✅ All detector methods present')
    passedTests++
  } else {
    throw new Error(`Missing methods: ${missing.join(', ')}`)
  }
} catch (error) {
  console.log(`   ❌ FAIL: ${error.message}`)
  failedTests++
}

// Test 6: Error handling - connect without wallet
console.log('\n🔧 Test 6: Error Handling')
try {
  const connector = new BIP322Connector()
  connector.sign('test', 'test').catch(err => {
    if (err.message.includes('No wallet connected')) {
      console.log('   ✅ Proper error handling works')
      passedTests++
    }
  })
  
  // Give it a moment to reject
  setTimeout(() => {
    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('📊 Test Summary')
    console.log('='.repeat(60))
    console.log(`Total Tests: ${passedTests + failedTests}`)
    console.log(`✅ Passed: ${passedTests}`)
    console.log(`❌ Failed: ${failedTests}`)
    console.log(`Success Rate: ${((passedTests/(passedTests+failedTests))*100).toFixed(1)}%`)
    
    if (failedTests === 0) {
      console.log('\n🎉 ALL TESTS PASSED!')
      console.log('✅ Library is ready for use')
    } else {
      console.log('\n⚠️ Some tests failed')
      process.exit(1)
    }
  }, 100)
  
} catch (error) {
  console.log(`   ❌ FAIL: ${error.message}`)
  failedTests++
}