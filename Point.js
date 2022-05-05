/**
* A point with some coordinates.
*/
class Point 
{

    /**
    * A constructor for making a point.
    * @param    x    the x-coordinate
    * @param    y    the y-coordinate.
    */
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    } 

    /**
    * You get the x-coordinate.
    * @return the x-coordinate.
    */
    getX() {
        return this.x;
    }

    /**
    * Get the y-coordinate
    * @return the y-coordinate.
    */
    getY()
    {
        return this.y;
    }
}