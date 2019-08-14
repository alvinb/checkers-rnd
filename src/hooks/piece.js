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