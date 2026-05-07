import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const FeaturesSection: React.FC = () => {
  return (
    <>
      <CardContainer>
        <CardTitle title="Key Features Demonstrated" className="mt-6 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <LucideIcons.Server className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <Typography tag="h4" className="font-semibold mb-1">
                    Server-Side Pagination
                  </Typography>
                  <Typography tag="p" className="text-sm text-muted-foreground">
                    Data is fetched from the API on each page change, with
                    proper loading states and total count management.
                  </Typography>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <LucideIcons.ArrowUpDown className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <Typography tag="h4" className="font-semibold mb-1">
                    Multi-Column Sorting
                  </Typography>
                  <Typography tag="p" className="text-sm text-muted-foreground">
                    Sort by multiple columns simultaneously. Click column
                    headers to sort ascending, descending, or remove sorting.
                  </Typography>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <LucideIcons.GripVertical className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                <div>
                  <Typography tag="h4" className="font-semibold mb-1">
                    Column Management
                  </Typography>
                  <Typography tag="p" className="text-sm text-muted-foreground">
                    Drag to reorder, resize columns, pin left/right, and toggle
                    visibility. All preferences are persisted.
                  </Typography>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <LucideIcons.ChevronDown className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <Typography tag="h4" className="font-semibold mb-1">
                    Expandable Rows
                  </Typography>
                  <Typography tag="p" className="text-sm text-muted-foreground">
                    Click the expand icon to view detailed information about
                    each character in a custom sub-component.
                  </Typography>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <LucideIcons.Save className="w-5 h-5 text-cyan-500 mt-0.5 shrink-0" />
                <div>
                  <Typography tag="h4" className="font-semibold mb-1">
                    State Persistence
                  </Typography>
                  <Typography tag="p" className="text-sm text-muted-foreground">
                    Column order, visibility, sizing, and pinning preferences
                    are automatically saved to localStorage.
                  </Typography>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <LucideIcons.Loader2 className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" />
                <div>
                  <Typography tag="h4" className="font-semibold mb-1">
                    Loading States
                  </Typography>
                  <Typography tag="p" className="text-sm text-muted-foreground">
                    Built-in loading indicators and error handling for better
                    user experience during data fetching.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default FeaturesSection;
