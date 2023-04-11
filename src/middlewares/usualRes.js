import { AuthentiationFailed  } from '../entities/errors/AuthenticationFailed.js';
import { PermissionsFailed } from '../entities/errors/PermissionsFailed.js'

export function usualRes (req, res, next) {
    //cargamos una funcion dentro de res, con el nombre 'success' (remember that req is type of object)
    res.sendSuccess = result => {
        res.json({ status: "success", result })
    }

    res.sendClientError = error => {
        res.status(400).json({ status: "error", error })
    }

    res.sendServerError = error => {
        res.status(500).json({ status: "error", error })
    }

    res.sendAuthenticationError = error => {
        res.status(401).json({ status: "error", error: new AuthentiationFailed() })
    }

    res.sendPermissionsError = error => {
        res.status(403).json({ status: "error", error: new PermissionsFailed() })
    }
};