import type { StarWarsPerson } from '../../../queries/types';
import { CardContainer, Typography, LucideIcons } from '@e-burgos/tucu-ui';

interface PersonDetailsProps {
  person: StarWarsPerson;
}

export function PersonDetails({ person }: PersonDetailsProps) {
  return (
    <CardContainer className="p-4 m-2">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <LucideIcons.User className="w-6 h-6 text-white" />
          </div>
          <Typography tag="h3" className="text-xl font-bold">
            {person.name}
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LucideIcons.Ruler className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Typography tag="span" className="text-sm font-medium">
                Height:
              </Typography>
              <Typography tag="span" className="text-sm">
                {person.height === 'unknown'
                  ? 'Unknown'
                  : `${person.height} cm`}
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <LucideIcons.Scale className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Typography tag="span" className="text-sm font-medium">
                Mass:
              </Typography>
              <Typography tag="span" className="text-sm">
                {person.mass === 'unknown' ? 'Unknown' : `${person.mass} kg`}
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <LucideIcons.Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Typography tag="span" className="text-sm font-medium">
                Birth Year:
              </Typography>
              <Typography tag="span" className="text-sm">
                {person.birth_year}
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <LucideIcons.User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Typography tag="span" className="text-sm font-medium">
                Gender:
              </Typography>
              <Typography tag="span" className="text-sm capitalize">
                {person.gender === 'n/a' ? 'N/A' : person.gender}
              </Typography>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LucideIcons.Palette className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Typography tag="span" className="text-sm font-medium">
                Hair Color:
              </Typography>
              <Typography tag="span" className="text-sm capitalize">
                {person.hair_color}
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <LucideIcons.Palette className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Typography tag="span" className="text-sm font-medium">
                Skin Color:
              </Typography>
              <Typography tag="span" className="text-sm capitalize">
                {person.skin_color}
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <LucideIcons.Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Typography tag="span" className="text-sm font-medium">
                Eye Color:
              </Typography>
              <Typography tag="span" className="text-sm capitalize">
                {person.eye_color}
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <LucideIcons.Film className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Typography tag="span" className="text-sm font-medium">
                Films:
              </Typography>
              <Typography tag="span" className="text-sm">
                {person.films.length}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
