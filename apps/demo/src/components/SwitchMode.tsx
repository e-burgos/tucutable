import { useTheme, InputSwitch, LucideIcons, Button } from '@e-burgos/tucu-ui';
import { DOCUMENTATION_URL } from '../utils/constants';

const SwitchMode = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <InputSwitch
        onLabel={
          (<LucideIcons.Moon className="w-4 h-4" />) as unknown as string
        }
        offLabel={
          (<LucideIcons.Sun className="w-4 h-4" />) as unknown as string
        }
        checked={mode === 'dark'}
        onChange={(checked) => setMode(checked ? 'dark' : 'light')}
      />
      <Button
        variant="ghost"
        size="small"
        onClick={() => {
          window.open(DOCUMENTATION_URL, '_blank');
        }}
      >
        <div className="flex items-center gap-2">
          <LucideIcons.PlayCircle className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">Playground</span>
        </div>
      </Button>
    </div>
  );
};

export default SwitchMode;
