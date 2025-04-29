function processOrder(orderId, items) {
    console.log(`Processing order with ID: ${orderId}`);
    console.info(`Order details: ${JSON.stringify(items)}`);
    let total = 0;
    for (const item of items) {
    total += item.price * item.quantity;
    if (item.quantity > 10) {
        console.warn(`Large quantity detected for item: ${item.name}`);
    }
    if (item.price <= 0) {
        console.error(`Invalid price found for item: ${item.name}`);
        // In a real application, you might want to handle this more robustly
    }
    }
    console.log(`Order ${orderId} processed. Total: $${total.toFixed(2)}`);
    return total;
}

try {
    const order1 = { id: 123, items: [{ name: 'Laptop', price: 1200, quantity: 1 }, { name: 'Mouse', price: 25, quantity: 2 }] };
    processOrder(order1.id, order1.items);

    const order2 = { id: 456, items: [{ name: 'Keyboard', price: 75, quantity: 15 }, { name: 'Monitor', price: 300, quantity: 1 }, { name: 'Broken Item', price: 0, quantity: 1 }] };
    processOrder(order2.id, order2.items);

    throw new Error('Simulating a critical error');

} catch (error) {
    console.error(`An error occurred: ${error.message}`);
}

console.debug('This is a debug message for development.');