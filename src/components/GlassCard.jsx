/**
 * GlassCard – reusable glassmorphic container.
 *
 * @param {{ children: React.ReactNode, className?: string, style?: object }} props
 */
export default function GlassCard({ children, className = '', style = {} }) {
    return (
        <div className={`glass ${className}`} style={style}>
            {children}
        </div>
    );
}
