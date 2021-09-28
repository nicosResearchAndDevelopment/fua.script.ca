function random_key(length) {
    const
        upper        = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        lower        = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        int          = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        special      = ["!", "§", "$", "%", "&", "", "(", ")", "=", "?", "+", "#", "~", "@", "<", ">"]
    ;
    let
        setup        = [[upper.length, upper], [lower.length, lower], [int.length, int], [special.length, special]],
        setup_length = setup.length,
        result       = "";
    for (let i = 0; i < length; i++) {
        let a_setup = setup[Math.floor(Math.random() * setup_length)];
        result += a_setup[1][Math.floor(Math.random() * setup_length)];
    } // for (i)
    return result;
}