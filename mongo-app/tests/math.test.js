const calculateTip = (sum, tip=0.2) => (sum + sum*tip)

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12)
})

test('Async test demo', (done) => {
    setTimeout(() => {
        expect(2).toBe(2)
        done()
    }, 2000)
})