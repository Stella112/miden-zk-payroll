import { useState, useCallback } from 'react';
import { runPayroll } from '../services/api';

/**
 * Custom hook encapsulating all payroll form state and submission logic.
 *
 * @returns {{
 *   employeeId: string,
 *   amount: string,
 *   isLoading: boolean,
 *   error: string | null,
 *   result: Object | null,
 *   setEmployeeId: Function,
 *   setAmount: Function,
 *   handleSubmit: Function,
 *   reset: Function,
 * }}
 */
export function usePayroll() {
    const [employeeId, setEmployeeId] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const reset = useCallback(() => {
        setError(null);
        setResult(null);
        setIsSuccess(false);
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (!employeeId.trim() || !amount) return;

            setIsLoading(true);
            setError(null);
            setResult(null);
            setIsSuccess(false);

            try {
                const scaledAmount = Number(amount) * 1000000;
                const data = await runPayroll({ employeeId: employeeId.trim(), amount: scaledAmount });
                // Inject the request inputs in case the backend raw output doesn't include them cleanly
                setResult({ ...data, _requestAmount: amount, _requestEmployee: employeeId.trim() });
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            } catch (err) {
                setError(err.message ?? 'An unexpected error occurred. Please try again.');
            } finally {
                setIsLoading(false);
            }
        },
        [employeeId, amount]
    );

    return {
        employeeId,
        amount,
        isLoading,
        error,
        result,
        isSuccess,
        setEmployeeId,
        setAmount,
        handleSubmit,
        reset,
    };
}
