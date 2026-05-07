import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Alert,
} from '@e-burgos/tucu-ui';

const IntroductionSection: React.FC = () => {
  return (
    <>
      <CardContainer>
        <CardTitle
          title="Live Example: Star Wars Characters"
          className="mb-4 mt-6"
        >
          <div className="space-y-4">
            <Typography tag="p" className="text-muted-foreground">
              This example demonstrates Tucutable's capabilities using the{' '}
              <a
                href="https://swapi.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Star Wars API (SWAPI)
              </a>
              . The table features:
            </Typography>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Server-side pagination with real API calls</li>
              <li>Column sorting (multi-column support)</li>
              <li>Column management (reorder, resize, pin, visibility)</li>
              <li>Expandable rows to show detailed information</li>
              <li>
                State persistence (column preferences saved in localStorage)
              </li>
              <li>Loading and error states</li>
              <li>Responsive design with horizontal scrolling</li>
            </ul>
            <Alert variant="info" dismissible={false}>
              <Typography tag="p" className="text-sm text-muted-foreground">
                <LucideIcons.Info className="w-4 h-4 inline mr-2" />
                Try dragging columns to reorder them, resizing columns, pinning
                columns, or toggling column visibility. Your preferences will be
                automatically saved!
              </Typography>
            </Alert>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default IntroductionSection;
