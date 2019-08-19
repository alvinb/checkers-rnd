import { useState, useEffect } from "react";


export const usePiecePreviousCoordinate = (selectedP) => {
    const [coordinates, setCoordinates] = useState({});

    useEffect(() => {
        setCoordinates({
            x: selectedP.x,
            y: selectedP.y
        })
    },[selectedP])

    return coordinates
}
// export const usePieceIdOfLastMove = (id) => {
//   const [pieceId, setPieceId] = useState(null);

//   useEffect(() => {
//     setPieceId(true);
//   }, [id]);

//   return pieceId;
// };