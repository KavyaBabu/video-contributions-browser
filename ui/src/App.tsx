import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Pagination,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface Contribution {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  owner: string;
}

interface Status {
  label: string;
  color: string;
  bgColor: string;
}

interface ContributionCardProps {
  contribution: Contribution;
}

const getContributionStatus = (startTime: string, endTime: string): Status => {
  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if (now < start) {
    return {
      label: 'Scheduled',
      color: '#FC8D21',
      bgColor: '#fff4e5'
    };
  } else if (now >= start && now <= end) {
    return {
      label: 'Active',
      color: '#14c2a1',
      bgColor: '#edf7ed'
    };
  } else {
    return {
      label: 'Complete',
      color: '#03AEE7',
      bgColor: '#e5f6fd'
    };
  }
};

const ContributionCard: React.FC<ContributionCardProps> = ({ contribution }) => {
  const { title, description, startTime, endTime, owner } = contribution;
  const status = getContributionStatus(startTime, endTime);

  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const progress = Math.min(Math.max(((now - start) / (end - start)) * 100, 0), 100);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom noWrap>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            bgcolor: status.bgColor,
            color: status.color,
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            mb: 1
          }}
        >
          <Typography variant="body2" fontWeight="medium">
            {status.label}
          </Typography>
        </Box>

        {status.label === 'Active' && (
          <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
        )}

        <Box sx={{ mt: 'auto' }}>
          <Typography variant="body2" color="text.secondary">
            Start: {new Date(startTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            End: {new Date(endTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Owner: {owner}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

interface TableViewProps {
  contributions: Contribution[];
}

const TableView: React.FC<TableViewProps> = ({ contributions }) => (
  <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>Start Time</TableCell>
          <TableCell>End Time</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contributions.map((contribution) => {
          const status = getContributionStatus(contribution.startTime, contribution.endTime);
          return (
            <TableRow key={contribution.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
              <TableCell>{contribution.title}</TableCell>
              <TableCell>{contribution.owner}</TableCell>
              <TableCell>{new Date(contribution.startTime).toLocaleString()}</TableCell>
              <TableCell>{new Date(contribution.endTime).toLocaleString()}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: status.bgColor,
                    color: status.color,
                    display: 'inline-flex'
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {status.label}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

const App: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    sort: 'title'
  });

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const contributionsPerPage = 14;

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const skip = (page - 1) * contributionsPerPage;
        const searchQuery = searchTerm ? `&title=${searchTerm}` : '';
        const sortQuery = `&order_by=${filters.sort}`;
        const response = await fetch(
          `http://127.0.0.1:8000/contributions/?skip=${skip}&limit=${contributionsPerPage}${searchQuery}${sortQuery}`
        );
        const data = await response.json();
        let filteredData = data.contributions;

        if (filters.status !== 'all') {
          filteredData = filteredData.filter((contribution: Contribution) => {
            const status = getContributionStatus(contribution.startTime, contribution.endTime);
            return status.label.toLowerCase() === filters.status;
          });
        }

        setContributions(filteredData);
        setTotalPages(Math.ceil(data.total / contributionsPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contributions:', error);
        setLoading(false);
      }
    };

    fetchContributions();
  }, [page, searchTerm, filters]);

  const getGridCols = () => {
    if (isMobile) return 12;
    if (isTablet) return 6;
    return 4;
  };

  if (loading) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          placeholder="Search contributions by title..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>View Mode</InputLabel>
          <Select
            value={isGridView}
            label="View Mode"
            onChange={(e) => setIsGridView(e.target.value === 'true')}
          >
            <MenuItem value="true">Grid View</MenuItem>
            <MenuItem value="false">Table View</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="scheduled">Scheduled</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sort}
            label="Sort By"
            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="startTime">Start Time</MenuItem>
            <MenuItem value="endTime">End Time</MenuItem>
            <MenuItem value="owner">Owner</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isGridView ? (
        <Grid container spacing={3}>
          {contributions.map((contribution) => (
            <Grid item xs={getGridCols()} key={contribution.id}>
              <ContributionCard contribution={contribution} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableView contributions={contributions} />
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
};

export default App;