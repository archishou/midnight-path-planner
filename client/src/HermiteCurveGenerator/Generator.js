import {Matrix, solve} from "ml-matrix";
import Point from './Point'
import Segment from './Segment'
function generateConstraintMatrix(ns) {
    // Each point apart from the initial point, requires 4 constraints. N represents the number of constraints.
    let numPoints = ns.length;
    let n = (numPoints - 1) * 4;
    let matrix = new Array(n).fill(0).map(row => new Array(n).fill(0));
    if (numPoints === 1) return null;
    // Initial velocity = 0
    matrix[0][1] = 1;
    // Final velocity = 0
    matrix[1][n-1] = 3;
    matrix[1][n-2] = 2;
    matrix[1][n-3] = 1;

    // We filled equations 0 & 1 with initial and final velocity constraint.
    let equationIndex = 2;
    let pointIndex = 1;
    while (equationIndex < n) {
        // Start of segment is equal to initial point.
        let segmentIndexStart = ((pointIndex - 1) * 4);
        matrix[equationIndex][segmentIndexStart] = 1;
        equationIndex++;
        // End of segment is equal to destination.
        let segmentCoeffIndex = 0;
        while (segmentCoeffIndex < 4) {
            matrix[equationIndex][segmentCoeffIndex + segmentIndexStart] = 1;
            segmentCoeffIndex++;
        }
        equationIndex++;
        // Smooth velocities and accelerations if there is another point left to complete
        if (pointIndex < numPoints - 1) {
            // Velocity Constraint
            matrix[equationIndex][segmentIndexStart + 1] = 1;
            matrix[equationIndex][segmentIndexStart + 2] = 2;
            matrix[equationIndex][segmentIndexStart + 3] = 3;
            matrix[equationIndex][segmentIndexStart + 5] = -1;
            equationIndex++;

            matrix[equationIndex][segmentIndexStart + 2] = 2;
            matrix[equationIndex][segmentIndexStart + 3] = 6;
            matrix[equationIndex][segmentIndexStart + 6] = -2;
            equationIndex++;
        }

        pointIndex++;
    }
    return new Matrix(matrix);
}

function generateSolutionsMatrix(ns) {
    let numPoints = ns.length;
    let n = (numPoints - 1) * 4;
    let matrix = new Array(n).fill(0).map(row => new Array(1).fill(0));
    let pointIndex = 0, solutionIndex = 0;
    while (solutionIndex < n) {
        matrix[solutionIndex + 2][0] = ns[pointIndex];
        matrix[solutionIndex + 3][0] = ns[pointIndex + 1];
        solutionIndex += 4;
        pointIndex++;
    }
    return new Matrix(matrix);
}

function getSegments(ns) {
    let segments = [];
    let constraints = generateConstraintMatrix(ns);
    let solutions = generateSolutionsMatrix(ns);
    if (constraints == null) return null;
    let coeffs = solve(constraints, solutions);
    let n = coeffs.rows;
    let index = 0;
    while (index < n) {
        segments.push(new Segment(coeffs.get(index + 3, 0), coeffs.get(index + 2, 0), coeffs.get(index + 1, 0), coeffs.get(index, 0)));
        index += 4;
    }
    return segments;
}

export default function GetPoints(knots) {
    let xs = [];
    let ys = [];
    knots.forEach((e) => {
       xs.push(e.x);
       ys.push(e.y);
    });

    let xSegments = getSegments(xs);
    let ySegments = getSegments(ys);
    if (xSegments == null || ySegments == null) return null;
    let points = [];
    let t = 0;
    let resolution = 0.01;
    // segments = knots - 1
    let n = knots.length - 1;
    let index = 0;
    while (index < n) {
        while (t < 1) {
            points.push(new Point(xSegments[index].compute(t), ySegments[index].compute(t)));
            t += resolution;
        }
        t = 0;
        index++;
    }
    return points;
}