

const dice = (value, plus = 0, min = null, max = null) => {
    const ss = value.split('d');
    const loops = Number(ss[0]) || 1;
    const side = Number(ss[1]) || 0;
    const throw_dice = () => Math.ceil(Math.random() * side) ;
    let result = 0;
    // Array(loops).fill(0).forEach(()=>{ result += throw_dice() })
    for (let i = 0; i < loops; i++) {
        result += throw_dice();
    }
    return result + plus;
}


export default dice;